import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import styles from './css/TimestampList.module.css';

export default function TimestampList(props) {
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/timesheet/${props.timesheet}`)
      .then(response => response.json())
      .then(json => {
        setTimestamps(json.data.timestamp.sort(() => -1));
        props.setRefresh(false);
      });
  }, [props.refresh]);

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Name</th>
          <th>Club</th>
        </tr>
      </thead>
      <tbody>
        {timestamps.map((timestamp, index) => (
          <tr key={index}>
            <td>{format(new Date(timestamp.datetime), 'MMMM DD')}</td>
            <td>{format(new Date(timestamp.datetime), 'hh:mm a')}</td>
            <td>{timestamp.student.name}</td>
            <td>
              {timestamp.student.clubs.map(club =>
                club.day ===
                parseInt(format(new Date(timestamp.datetime), 'E')) - 1
                  ? club.name
                  : null
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
