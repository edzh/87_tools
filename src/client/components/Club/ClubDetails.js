import React, { useState } from 'react';
import { daysOfWeek } from 'utils/constants';
import EditClub from './EditClub';

export default ({ currentClub, sessions, editDetails, setEditDetails }) => {
  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b bg-gray-800 w-full">
        <h2 className="m-4 font-normal text-white">{currentClub}</h2>
        <button
          className={`${
            editDetails ? 'bg-blue-500 text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditDetails(!editDetails)}
        >
          Edit
        </button>
      </div>

      {/*editDetails ? (
        <EditClub
          currentClub={currentClub.item}
          sessions={sessions}
          setEditDetails={setEditDetails}
        />
      ) : (
        <div className="m-4">
          <h3>Weekday</h3>
          <p className="my-2">{daysOfWeek[currentClub.item.day]}</p>

          <h3>Session</h3>
          <p className="my-2">{currentClub.item.session && currentClub.item.session.name}</p>

          <h3>Capacity</h3>
          <p className="my-2">
            {currentClub.item.students ? currentClub.item.students.length : 0}/{currentClub.item.capacity}
          </p>
        </div>
      )*/}
    </div>
  );
};
