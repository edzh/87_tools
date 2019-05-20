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
    <div className="mb-3 border shadow-md rounded mt-4 lg:mt-0">
      <h2 className="p-4 font-normal text-white bg-grey-darkest shadow">
        {timesheet.io === 'in' ? 'Sign In' : 'Sign Out'} -{' '}
        {format(timesheet.date, 'dddd, MMMM D')}
      </h2>
      <div className="overflow-auto w-full block" style={{ height: '520px' }}>
        <div className="border-b flex border-grey-light px-4 pt-4">
          <p className="py-1 font-bold w-64">Name</p>
          <p className="py-1 font-bold w-64">Club</p>
          <p className="py-1 font-bold w-24">Time</p>
          <p className="py-1 font-bold w-32">Option</p>
        </div>
        {timesheet.timestamp.map((timestamp, index) => (
          <div
            key={timestamp._id}
            className="text-sm flex py-1 px-4 bg-transparent border-b border-grey-light"
          >
            <p className="w-1/3">
              <Link
                className="no-underline text-blue hover:text-blue-light"
                to={`/student/${timestamp.student._id}`}
              >
                {timestamp.student.name}
              </Link>
            </p>
            <p className=" w-1/3">
              {timestamp.student.clubs.map(club =>
                club.day === parseInt(format(new Date(timesheet.date), 'E'))
                  ? club.name
                  : null
              )}
            </p>
            <p className=" w-24">
              {format(new Date(timestamp.datetime), 'hh:mm a')}
            </p>
            <p className=" w-32 flex">
              <button
                className="border text-xs hover:bg-red hover:text-white p-1 mr-1 -my-1 rounded"
                onClick={() => removeTimestamp(timestamp._id)}
              >
                Remove
              </button>
              <p className="mx-1">{timestamp.fobStatus}</p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
