import React, { useState } from 'react';
import TimesheetButton from './TimesheetButton';
import { format, parseISO } from 'date-fns';

export default ({ timesheetsDate }) => {
  const [inExists, setInExists] = useState(
    !!timesheetsDate.timesheets.find(timesheet => timesheet.io === 'in')
  );
  const [outExists, setOutExists] = useState(
    !!timesheetsDate.timesheets.find(timesheet => timesheet.io === 'out')
  );

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
