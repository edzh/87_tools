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
  delete: async studentId => {
    const data = await fetch(`${apiUrl}/api/student/${studentId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};

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

export const fetchSessions = {
  get: {
    program: async programId => {
      const data = await fetch(`${apiUrl}/program/${programId}/sessions`, {
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
