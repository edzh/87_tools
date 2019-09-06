import React from 'react';
import { format } from 'date-fns';

export default function TimestampList({
  currentTimesheet,
  timestamps,
  clubs,
  students
}) {
  return (
    <div>
      <h2>
        Timestamps{' '}
        {currentTimesheet.item &&
          format(currentTimesheet.item.date, 'dddd, MMMM D')}
      </h2>
      <ul className="list-reset">
        {timestamps.items &&
          clubs.items &&
          students.items &&
          timestamps.items.map(timestamp => (
            <li className="flex text-sm" key={timestamp._id}>
              <p className="w-24">{format(timestamp.datetime, 'hh:mm a')}</p>
              <p className="w-64">{timestamp.student.name}</p>
              <p>{timestamp.club && timestamp.club.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
