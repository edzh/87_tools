import { apiUrl } from 'config';
import headers from './headers';

export const fetchPrograms = {
  get: {
    user: async () => {
      const data = await fetch(`${apiUrl}/api/program/`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async programId => {
      const data = await fetch(`${apiUrl}/api/program/${programId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async program => {
    const data = await fetch(`${apiUrl}/api/program`, {
      method: 'POST',
      headers,
      body: JSON.stringify(program)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async program => {
    const data = await fetch(`${apiUrl}/api/program/${program._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(program)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async programId => {
    const data = await fetch(`${apiUrl}/api/program/${programId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
