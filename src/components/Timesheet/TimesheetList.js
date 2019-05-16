import React from 'react';
import { apiUrl } from 'config';
import { format } from 'date-fns';

import TimesheetListRow from './TimesheetListRow';

export default function TimesheetList(props) {
  if (props.isFetching && props.timesheets === null) {
    return <p>Loading...</p>;
  }

  const indexedTimesheets = props.timesheets.reduce(
    (timesheetByDay, timesheet) => {
      timesheetByDay[timesheet.date] = timesheetByDay[timesheet.date] || [];
      timesheetByDay[timesheet.date].push({
        _id: timesheet._id,
        io: timesheet.io,
        amount: timesheet.timestamp.length
      });

      return timesheetByDay;
    },
    {}
  );

  const timesheetsByDate = Object.keys(indexedTimesheets)
    .map(key => {
      return {
        date: key,
        timesheets: indexedTimesheets[key]
      };
    })
    .sort((a, b) => {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });

  return (
    <div className="">
      <h2 className="m-2">Timesheets</h2>
      <table className="m-2 border rounded overflow-auto block">
        <thead className="w-full block">
          <tr className="border-b w-full block border-grey-light flex">
            <th className="py-1 pl-2 text-left block w-1/4">Date</th>
            <th className="py-1 pl-2 text-left block w-1/4">Type</th>
            <th className="py-1 pl-2 text-left block w-1/4">
              # of Students In
            </th>
            <th className="py-1 pl-2 text-left block w-1/4">
              # of Students Out
            </th>
          </tr>
        </thead>
        <tbody className="block" style={{ height: '480px' }}>
          {timesheetsByDate.map((timesheetsDate, index) => (
            <TimesheetListRow
              key={timesheetsDate.date}
              timesheetsDate={timesheetsDate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
