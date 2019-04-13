import React from 'react';
import { apiUrl } from 'config';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './css/TimesheetList.module.css';

export default function TimesheetList(props) {
  if (props.isFetching && props.timesheets === null) {
    return <p>Loading...</p>;
  }

  const deleteTimesheet = async timesheetId => {
    try {
      const timesheet = await fetch(`${apiUrl}/api/timesheet/${timesheetId}`, {
        method: 'DELETE'
      });

      return timesheet;
    } catch (e) {
      return Promise.reject();
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Quantity</th>
          <th>Type</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.timesheets.map((timesheet, index) => {
          return (
            <tr key={index}>
              <td>
                <Link to={`/timesheet/id/${timesheet._id}`}>
                  {format(new Date(timesheet.date), 'MMMM DD')}
                </Link>
              </td>
              <td>{timesheet.timestamp.length}</td>
              <td>{timesheet.io === 'in' ? 'Sign In' : 'Sign Out'}</td>
              <td>
                <button onClick={() => deleteTimesheet(timesheet._id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
