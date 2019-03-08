import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function TimestampList(props) {
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/timesheet/${props.timesheet}`)
      .then(response => response.json())
      .then(json => {
        setTimestamps(json.data.timestamp);
        props.setRefresh(false);
      });
  }, [props.refresh]);

  console.log(timestamps);

  return (
    <ul>
      {timestamps.map((timestamp, index) => (
        <li key={index}>
          <p>{timestamp.datetime}</p>
          <p>{timestamp.student.name}</p>
        </li>
      ))}
    </ul>
  );
}
