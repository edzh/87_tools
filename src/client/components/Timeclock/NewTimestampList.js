import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function TimestampList({
  currentTimesheet,
  timestamps,
  clubs,
  deleteTimestamp,
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
          students.items &&
          timestamps.items.map(timestamp => (
            <li className="border-b flex text-sm" key={timestamp._id}>
              <p className="w-24">{format(timestamp.datetime, 'hh:mm a')}</p>
              <p className="w-64">
                <Link to={`/student/${timestamp.student._id}`}>
                  {timestamp.student.name}
                </Link>
              </p>
              <p className="w-64">
                <Link to={`/club/${timestamp.club && timestamp.club._id}`}>
                  {timestamp.club && timestamp.club.name}
                </Link>
              </p>
              <p className="w-8">{timestamp.fobStatus}</p>
              <p
                className={`cursor-pointer text-lg text-red-lighter font-bold -my-1 ml-auto hover:text-red rounded`}
                onClick={() => deleteTimestamp(timestamp._id)}
              >
                ×
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
