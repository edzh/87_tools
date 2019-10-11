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
    <div className="border rounded shadow-md">
      <h2 className="p-4 border-b rounded-t font-normal bg-gray-800 text-white shadow">
        Timesheets
      </h2>
      <table
        className="overflow-auto block"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <thead className="w-full block">
          <tr className="px-4 py-2 border-b w-full block border-gray-400 flex">
            <th className="text-left block w-1/4">Date</th>
            <th className="text-left block w-1/4">Type</th>
            <th className="text-left block w-1/4"># of Students In</th>
            <th className="text-left block w-1/4"># of Students Out</th>
          </tr>
        </thead>
        <tbody className="block" style={{ height: '480px' }}>
          {timesheetsByDate &&
            timesheetsByDate.map((timesheetsDate, index) => (
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
