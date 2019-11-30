import { apiUrl } from 'config';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('id_token')}`
};

export const fetchStudents = {
  get: {
    program: async programId => {
      const data = await fetch(`${apiUrl}/api/program/${programId}/students`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    club: async clubId => {
      const data = await fetch(`${apiUrl}/api/club/${clubId}/students`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async studentId => {
      const data = await fetch(`${apiUrl}/api/student/${studentId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async student => {
    const data = await fetch(`${apiUrl}/api/student`, {
      method: 'POST',
      headers,
      body: JSON.stringify(student)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async student => {
    const data = await fetch(`${apiUrl}/api/student/${student._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(student)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async studentId => {}
};
