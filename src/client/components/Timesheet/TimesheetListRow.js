import React from 'react';
import TimesheetButton from './TimesheetButton';
import { format, parseISO } from 'date-fns';

export default ({ timesheetsDate }) => {
  return (
    <li className="py-2 px-4 group bg-transparent border-b border-gray-400 flex block">
      <div className="my-auto w-40 block">
        {format(parseISO(timesheetsDate.date), 'MMMM dd')}
      </div>
      <div className="my-auto flex block">
        {timesheetsDate.timesheets.map(timesheet => (
          <TimesheetButton key={timesheet._id} timesheet={timesheet} />
        ))}
      </div>
    </li>
  );
};
