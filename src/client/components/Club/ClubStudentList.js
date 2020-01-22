import React from 'react';
import { Link } from 'react-router-dom';

import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ClubStudentList({ students }) {
  if (!students.allIds.length) return null;

  return (
    <div className="border shadow-md my-4">
      <div className="flex border-b">
        <h3 className="m-4">Students</h3>
      </div>
      <div className="m-4">
        {students.allIds.map(studentId => (
          <Link
            key={studentId}
            className="block no-underline text-blue-500 hover:text-blue-400"
            to={`/student/${studentId}`}
          >
            {students.byId[studentId].name}
          </Link>
        ))}
      </div>
    </div>
  );
}
