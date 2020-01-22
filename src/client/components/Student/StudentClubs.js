import React from 'react';
import { Link } from 'react-router-dom';

const intToDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default ({ student, editClubs, setEditClubs }) => {
  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b">
        <h3 className="m-4">Clubs</h3>
        <button
          className={`${
            editClubs ? 'bg-blue-500 text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditClubs(!editClubs)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
