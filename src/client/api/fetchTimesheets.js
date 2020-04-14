import { apiUrl } from 'config';
import headers from './headers';

export const fetchTimesheets = {
  get: {
    session: async sessionId => {
      const data = await fetch(
        `${apiUrl}/api/session/${sessionId}/timesheets`,
        {
          headers
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    one: async timesheetId => {
      const data = await fetch(`${apiUrl}/api/timesheet/${timesheetId}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    all: async () => {
      const data = await fetch(`${apiUrl}/api/timesheet`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    },
    dateRange: async (start, end) => {
      const data = await fetch(`${apiUrl}/api/timesheet/date/${start}/${end}`, {
        headers
      })
        .then(response => response.json())
        .then(json => json.data);

      return data;
    }
  },
  add: async timesheet => {
    const data = await fetch(`${apiUrl}/api/timesheet/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(timesheet)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  update: async timesheet => {
    const data = await fetch(`${apiUrl}/api/timesheet/${timesheet._id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(timesheet)
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  },
  delete: async timesheetId => {
    const data = await fetch(`${apiUrl}/api/timesheet/${timesheetId}`, {
      method: 'DELETE',
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    return data;
  }
};
