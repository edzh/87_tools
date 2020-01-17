import React from 'react';
import { format, parseISO } from 'date-fns';

export default function TimesheetHeader({ currentTimesheet }) {
  if (!currentTimesheet.item) {
    return null;
  }

  return (
    <h2>
      {format(parseISO(currentTimesheet.item.date), 'EEEE, MMMM d')} Sign{' '}
      {currentTimesheet.item.io} Timesheet
    </h2>
  );
}
