import React, { useState } from 'react';
import { daysOfWeek } from 'utils/constants';
import EditClub from './EditClub';

export default ({ club, sessions, editDetails, setEditDetails }) => {
  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b bg-grey-darkest w-full">
        <h2 className="m-4 font-normal text-white">{club.name}</h2>
        <button
          className={`${
            editDetails ? 'bg-blue text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditDetails(!editDetails)}
        >
          Edit
        </button>
      </div>

      {editDetails ? (
        <EditClub
          club={club}
          sessions={sessions}
          setEditDetails={setEditDetails}
        />
      ) : (
        <div className="m-4">
          <h3>Weekday</h3>
          <p className="my-2">{daysOfWeek[club.day]}</p>

          <h3>Session</h3>
          <p className="my-2">{club.session && club.session.name}</p>

          <h3>Capacity</h3>
          <p className="my-2">
            {club.students ? club.students.length : 0}/{club.capacity}
          </p>
        </div>
      )}
    </div>
  );
};
