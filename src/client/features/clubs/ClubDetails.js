import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { intToDay } from 'utils/constants';
import { deleteCurrentClub } from 'client/actions/clubActions';

export default function ClubDetails() {
  const dispatch = useDispatch();
  const clubPage = useSelector(state => state.clubPage);
  const currentClub = clubPage.item;
  const { byId, allIds } = currentClub;
  const { students } = clubPage;
  if (!allIds) return null;

  return (
    <div className="border rounded shadow bg-white">
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
            {students.allIds.length}/{byId[allIds].capacity || 'N/A'}
          </p>
        </div>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-400 text-white p-1 mt-2 rounded"
          onClick={() => dispatch(deleteCurrentClub(allIds))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
