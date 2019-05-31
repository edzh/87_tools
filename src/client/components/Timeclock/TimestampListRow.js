import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default ({ timestamp, removeTimestamp, timesheet }) => {
  return (
    <div className="text-sm flex py-1 px-4 bg-transparent border-b border-grey-light">
      <p className="w-1/3">
        <Link
          className="no-underline text-blue hover:text-blue-light"
          to={`/student/${timestamp.student._id}`}
        >
          {timestamp.student.name}
        </Link>
      </p>
      <p className=" w-1/3">
        {/*timestamp.student.clubs.map(club =>
          club.day === parseInt(format(new Date(timesheet.date), 'E'))
            ? club.name
            : null
        )*/
        timestamp.club ? timestamp.club.name : null}
      </p>
      <p className=" w-24">{format(new Date(timestamp.datetime), 'hh:mm a')}</p>
      <p className=" w-32 flex">
        <button
          className="border text-xs hover:bg-red hover:text-white p-1 mr-1 -my-1 rounded"
          onClick={() => removeTimestamp(timestamp._id)}
        >
          Remove
        </button>
        <span className="mx-1">{timestamp.fobStatus}</span>
        <span className="mx-1">{`${
          timestamp.pickup ? timestamp.pickup.name : ''
        }`}</span>
      </p>
    </div>
  );
};
