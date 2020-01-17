import { apiUrl } from 'config';
import headers from './headers';

export const fetchTimestamps = {
  get: {
    timesheet: async timesheetId => {
      const data = await fetch(
        `${apiUrl}/api/timesheet/${timesheetId}/timestamps`,
        {
          headers
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    student: async studentId => {
      const data = await fetch(
        `${apiUrl}/api/student/${studentId}/timestamps`,
        {
          headers
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async timestampId => {
      const data = await fetch(`${apiUrl}/api/timestamp/${timestampId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async timestamp => {
    const data = await fetch(`${apiUrl}/api/timestamp/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(timestamp)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async timestamp => {
    const data = await fetch(`${apiUrl}/api/timestamp/${timestamp._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(timestamp)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async timestampId => {
    const data = await fetch(`${apiUrl}/api/timestamp/${timestampId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
