import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default ({ timestamp, removeTimestamp, timesheet }) => {
  const [hover, setHover] = useState(false);

  if (timesheet.io === 'in') {
    return (
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="text-sm flex py-1 px-4 bg-transparent border-b border-grey-light"
      >
        <p className="w-24">
          {format(new Date(timestamp.datetime), 'hh:mm a')}
        </p>
        <p className="w-64">
          <Link
            className="no-underline text-blue hover:text-blue-light"
            to={`/student/${timestamp.student._id}`}
          >
            {timestamp.student.name}
          </Link>
        </p>
        <p className="ml-4 w-64">
          {timestamp.club ? timestamp.club.name : null}
        </p>
        <p className="ml-4 w-16">{timestamp.fobStatus}</p>
        <button
          className={`${
            hover ? 'opacity-100' : 'opacity-0'
          } text-lg text-red-lighter font-bold -my-1 ml-auto hover:text-red rounded`}
          onClick={() => removeTimestamp(timestamp._id)}
        >
          ×
        </button>
      </div>
    );
  }

  if (timesheet.io === 'out') {
    return (
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="text-sm flex py-1 px-4 bg-transparent border-b border-grey-light"
      >
        <p className="w-24">
          {format(new Date(timestamp.datetime), 'hh:mm a')}
        </p>
        <p className="w-64">
          <Link
            className="no-underline text-blue hover:text-blue-light"
            to={`/student/${timestamp.student._id}`}
          >
            {timestamp.student.name}
          </Link>
        </p>
        <p className="ml-4 w-64">
          {timestamp.pickup ? timestamp.pickup.name : null}
        </p>
        <button
          className={`${
            hover ? 'opacity-100' : 'opacity-0'
          } text-lg text-red-lighter font-bold -my-1 ml-auto hover:text-red rounded`}
          onClick={() => removeTimestamp(timestamp._id)}
        >
          ×
        </button>
      </div>
    );
  }
};
