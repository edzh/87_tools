import React, { useState } from 'react';
import { intToDay } from 'utils/constants';
import EditClub from './EditClub';

export default ({
  currentClub,
  sessions,
  students,
  editDetails,
  setEditDetails,
  updateCurrentClub
}) => {
  const { allIds, byId } = currentClub;

  if (!allIds) return null;

  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b bg-gray-800 w-full">
        <h2 className="m-4 text-3xl text-white">{byId[allIds].name}</h2>
        <button
          className={`${
            editDetails ? 'bg-blue-500 text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditDetails(!editDetails)}
        >
          Edit
        </button>
      </div>
      <h2 className="m-4 font-normal">{intToDay[byId[allIds].day]}</h2>

      {editDetails ? (
        <EditClub
          currentClub={byId[allIds]}
          sessions={sessions}
          setEditDetails={setEditDetails}
          updateCurrentClub={updateCurrentClub}
        />
      ) : (
        <div className="m-4">
          <h3>Weekday</h3>
          <p className="my-2">{intToDay[byId[allIds].day]}</p>

          <h3>Session</h3>
          <p className="my-2">
            {byId[allIds].session && byId[allIds].session.name}
          </p>

          <h3>Capacity</h3>
          <p className="my-2">
            {students.allIds.length}/{byId[allIds].capacity}
          </p>
        </div>
      )}
    </div>
  );
};
