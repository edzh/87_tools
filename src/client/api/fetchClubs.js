import { apiUrl } from 'config';
import headers from './headers';

export const fetchClubs = {
  get: {
    session: async (sessionId, day) => {
      const data = await fetch(
        `${apiUrl}/api/session/${sessionId}/clubs${day ? `?day=${day}` : ''}`,
        {
          headers
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    student: async studentId => {
      const data = await fetch(`${apiUrl}/api/student/${studentId}/clubs`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async clubId => {
      const data = await fetch(`${apiUrl}/api/club/${clubId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async club => {
    const data = await fetch(`${apiUrl}/api/club/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(club)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async club => {
    const data = await fetch(`${apiUrl}/api/club/${club._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(club)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async clubId => {
    const data = await fetch(`${apiUrl}/api/club/${clubId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
