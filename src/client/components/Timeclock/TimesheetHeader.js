import React from 'react';
import { format } from 'date-fns';

export default function TimesheetHeader({ currentTimesheet }) {
  if (!currentTimesheet.item) {
    return null;
  }

  return (
    <h2>
      {format(currentTimesheet.item.date, 'dddd, MMMM D')} Sign{' '}
      {currentTimesheet.item.io} Timesheet
    </h2>
  );
}
