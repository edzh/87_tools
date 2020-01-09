import { apiUrl } from 'config';
import headers from './headers';

export const fetchUser = {
  get: async () => {
    const data = await fetch(`${apiUrl}/api/user`, {
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  add: async user => {
    const data = await fetch(`${apiUrl}/api/user`, {
      method: 'POST',
      headers,
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async user => {
    const data = await fetch(`${apiUrl}/api/user`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async userId => {
    const data = await fetch(`${apiUrl}/api/user/${userId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
