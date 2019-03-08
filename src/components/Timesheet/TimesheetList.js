import React from 'react';
import { Link } from 'react-router-dom';

export default function TimesheetList(props) {
  if (props.isFetching && props.timesheets === null) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {props.timesheets.map((timesheet, index) => (
        <li key={index}>
          <Link to={`/timesheet/id/${timesheet._id}`}>{timesheet.date}</Link>
        </li>
      ))}
    </ul>
  );
}
