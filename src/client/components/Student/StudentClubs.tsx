import React from 'react';
import { Link } from 'react-router-dom';

import EditStudentClubs from './EditStudentClubs';

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
            editClubs ? 'bg-blue text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditClubs(!editClubs)}
        >
          Edit
        </button>
      </div>
      {editClubs ? (
        <EditStudentClubs
          student={student}
          editClubs={editClubs}
          setEditClubs={setEditClubs}
        />
      ) : (
        <div className="p-4">
          {student.clubs.map((club, index) => (
            <div className="flex m-2" key={index}>
              <p className="w-32">{intToDay[club.day]}</p>
              <Link className="no-underline" to={`/club/id/${club._id}`}>
                <p className="text-blue-dark hover:text-blue">{club.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
