import { apiUrl } from 'config';
import headers from './headers';

export const fetchFamilies = {
  get: {
    program: async programId => {
      const data = await fetch(`${apiUrl}/api/program/${programId}/families`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async familyId => {
      const data = await fetch(`${apiUrl}/api/family/${familyId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async family => {
    const data = await fetch(`${apiUrl}/api/family`, {
      method: 'POST',
      headers,
      body: JSON.stringify(family)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async family => {
    const data = await fetch(`${apiUrl}/api/family/${family._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(family)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async familyId => {
    const data = await fetch(`${apiUrl}/api/family/${familyId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
