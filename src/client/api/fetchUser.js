import { apiUrl } from 'config';

export const fetchUser = {
  get: async () => {
    const data = await fetch(`${apiUrl}/api/user/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => json.data)
      .catch(err => err);

    return data;
  },
  add: async user => {
    const data = await fetch(`${apiUrl}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async user => {
    const data = await fetch(`${apiUrl}/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async userId => {
    const data = await fetch(`${apiUrl}/api/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
