import { apiUrl } from 'config';
import headers from './headers';

export const fetchSessions = {
  get: {
    program: async programId => {
      const data = await fetch(`${apiUrl}/api/program/${programId}/sessions`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async sessionId => {
      const data = await fetch(`${apiUrl}/api/session/${sessionId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async session => {
    const data = await fetch(`${apiUrl}/api/session/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(session)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async session => {
    const data = await fetch(`${apiUrl}/api/session/${session._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(session)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async sessionId => {
    const data = await fetch(`${apiUrl}/api/session/${sessionId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
