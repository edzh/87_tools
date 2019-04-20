import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { apiUrl } from 'config';

export default function TimestampList(props) {
  const { timesheet } = props;

  const removeTimestamp = async timestampId => {
    try {
      const timestamp = await fetch(`${apiUrl}/api/timestamp/${timestampId}`, {
        method: 'DELETE'
      }).then(() => {
        props.setRefresh(true);
      });

      return timestamp;
    } catch (e) {
      return Promise.reject();
    }
  };

  if (!timesheet.timestamp) {
    return <p>loading...</p>;
  }

  return (
    <div className="ml-4 mb-3 border rounded pt-4">
      <h2 className="px-2 pb-4 border-b">
        {timesheet.io === 'in' ? 'Sign In' : 'Sign Out'} -{' '}
        {format(timesheet.date, 'dddd, MMMM D')}
      </h2>
      <table className="overflow-auto w-full block">
        <thead>
          <tr className="border-b border-grey-light">
            <th className="py-1 pl-2 w-64">Name</th>
            <th className="py-1 pl-2 w-64">Club</th>
            <th className="py-1 pl-2 w-24">Time</th>
            <th className="py-1 pl-2 w-32">Option</th>
            {<th className="py-1 pl-2 w-32">PIN</th>}
          </tr>
        </thead>
        <tbody className="block" style={{ height: '520px' }}>
          {timesheet.timestamp.map((timestamp, index) => (
            <tr
              key={timestamp._id}
              className="bg-transparent hover:bg-grey-lighter border-b border-grey-light"
            >
              <td className="py-1 pl-2 w-64">
                <Link
                  className="no-underline"
                  to={`/student/${timestamp.student._id}`}
                >
                  {timestamp.student.name}
                </Link>
              </td>
              <td className="py-1 pl-2 w-64">
                {timestamp.student.clubs.map(club =>
                  club.day === parseInt(format(new Date(timesheet.date), 'E'))
                    ? club.name
                    : null
                )}
              </td>
              <td className="py-1 pl-2 w-24">
                {format(new Date(timestamp.datetime), 'hh:mm a')}
              </td>
              <td className="py-1 pl-2 w-32 flex">
                <button
                  className="bg-grey-light hover:bg-grey p-1 mr-1 rounded"
                  onClick={() => removeTimestamp(timestamp._id)}
                >
                  Remove
                </button>
                <p className="mx-1 p-1">{timestamp.fobStatus}</p>
              </td>
              {<td className="py-1 pl-2 w-32">{timestamp.student.pin}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
