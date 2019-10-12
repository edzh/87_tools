import React from 'react';
import { format } from 'date-fns';

import TimesheetListRow from './TimesheetListRow';

export default function TimesheetList({ timesheets }) {
  if (timesheets.isFetching && !timesheets.items) {
    return <div>Loading...</div>;
  }

  let indexedTimesheets;
  let timesheetsByDate;

  if (timesheets.items) {
    indexedTimesheets = timesheets.items.reduce((timesheetByDay, timesheet) => {
      timesheetByDay[timesheet.date] = timesheetByDay[timesheet.date] || [];
      timesheetByDay[timesheet.date].push({
        _id: timesheet._id,
        io: timesheet.io
        // amount: timesheet.timestamp.length
      });

      return timesheetByDay;
    }, {});

    timesheetsByDate = Object.keys(indexedTimesheets)
      .map(key => {
        return {
          date: key,
          timesheets: indexedTimesheets[key]
        };
      })
      .sort((a, b) => {
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      });
  }

  return (
    <ul
      className="overflow-auto block bg-white w-1/3 border border-gray-400 rounded"
      style={{ WebkitOverflowScrolling: 'touch', height: '480px' }}
    >
      <li className="px-4 py-2 border-b w-full block bg-gray-200 border-gray-400 flex">
        <div className="w-40">Date</div>
        <div className="">Type</div>
      </li>
      {timesheetsByDate &&
        timesheetsByDate.map((timesheetsDate, index) => (
          <TimesheetListRow
            key={timesheetsDate.date}
            timesheetsDate={timesheetsDate}
          />
        ))}
    </ul>
  );
}
