import React, { useState } from 'react';
import TimesheetButton from './TimesheetButton';
import { format } from 'date-fns';

export default ({ timesheetsDate }) => {
  const [inExists, setInExists] = useState(
    !!timesheetsDate.timesheets.find(timesheet => timesheet.io === 'in')
  );
  const [outExists, setOutExists] = useState(
    !!timesheetsDate.timesheets.find(timesheet => timesheet.io === 'out')
  );

  return (
    <tr className="py-2 px-4 group bg-transparent border-b border-grey-light flex block">
      <td className="my-auto w-1/4 block">
        {format(timesheetsDate.date, 'MMMM DD')}
      </td>
      <td className="my-auto w-1/4 block">
        {timesheetsDate.timesheets.map(timesheet => (
          <TimesheetButton key={timesheet._id} timesheet={timesheet} />
        ))}
      </td>
      <td className="my-auto w-1/4 block text-left">
        {/*inExists &&
          timesheetsDate.timesheets.find(timesheet => timesheet.io === 'in')
            .amount*/}
      </td>
      <td className="my-auto w-1/4 block text-left">
        {/*outExists &&
          timesheetsDate.timesheets.find(timesheet => timesheet.io === 'out')
            .amount*/}
      </td>
    </tr>
  );
};
