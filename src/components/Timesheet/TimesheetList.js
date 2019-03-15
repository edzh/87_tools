import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './css/TimesheetList.module.css';

export default function TimesheetList(props) {
  if (props.isFetching && props.timesheets === null) {
    return <p>Loading...</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {props.timesheets.map((timesheet, index) => (
          <tr key={index}>
            <td>
              <Link to={`/timesheet/id/${timesheet._id}`}>
                {format(new Date(timesheet.date), 'MMMM DD')}
              </Link>
            </td>
            <td>{timesheet.io === 'in' ? 'Sign In' : 'Sign Out'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
