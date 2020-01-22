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
      <div className="m-4">
        <div className="flex">
          <h3 className="font-bold text-xl text-gray-700 w-24">Weekday</h3>
          <p className="mt-1">{intToDay[byId[allIds].day]}</p>
        </div>
        <div className="flex">
          <h3 className="font-bold text-xl text-gray-700 w-24">Session</h3>
          <p className="mt-1">
            {byId[allIds].session && byId[allIds].session.name}
          </p>
        </div>
        <div className="flex">
          <h3 className="font-bold text-xl text-gray-700 w-24">Capacity</h3>
          <p className="mt-1">
            {students.allIds.length} /{byId[allIds].capacity || ' N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};
