import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './css/TimestampList.module.css';
import { apiUrl } from 'config';

export default function TimestampList(props) {
  const [timesheet, setTimesheet] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/timesheet/${props.timesheet}`)
      .then(response => response.json())
      .then(json => {
        setTimesheet(json.data);
        props.setRefresh(false);
      });
  }, [props.refresh]);

  const removeTimestamp = async timestampId => {
    try {
      const timestamp = await fetch(`${apiUrl}/api/timestamp/${timestampId}`, {
        method: 'DELETE'
      }).then(() => {
        props.setRefresh(true);
      });

      return timestamp;
    } catch (e) {
      return Promise.reject();
    }
  };

  return (
    <>
      <h2>
        {timesheet.io === 'in' ? 'Sign In' : 'Sign Out'} -{' '}
        {format(timesheet.date, 'dddd')}
      </h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Club</th>
            <th>Date</th>
            <th>Time</th>
            <th>PIN</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {timesheet.timestamp &&
            timesheet.timestamp
              .sort(() => -1)
              .map((timestamp, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/student/${timestamp.student._id}`}>
                      {timestamp.student.name}
                    </Link>
                  </td>
                  <td>
                    {timestamp.student.clubs.map(club =>
                      club.day ===
                      parseInt(format(new Date(timesheet.date), 'E'))
                        ? club.name
                        : null
                    )}
                  </td>
                  <td>{format(new Date(timestamp.datetime), 'MMMM DD')}</td>
                  <td>{format(new Date(timestamp.datetime), 'hh:mm a')}</td>
                  <td>{timestamp.student.pin}</td>
                  <td>
                    <button onClick={() => removeTimestamp(timestamp._id)}>
                      x
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
}
