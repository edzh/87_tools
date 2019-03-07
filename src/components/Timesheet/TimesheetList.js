import React from 'react';

export default function TimesheetList(props) {
  if (props.isFetching && props.timesheets === null) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {props.timesheets.map((timesheet, index) => (
        <li key={index}>{timesheet.date}</li>
      ))}
    </ul>
  );
}
