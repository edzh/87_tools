import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Student({ studentId, currentStudent }) {
  if (!currentStudent.allIds) return null;

  return (
    <div>
      <h3 className="text-lg">
        <Link
          to={`/program/${
            currentStudent.byId[currentStudent.allIds].program
          }/students`}
        >
          <span className="font-bold text-blue-500">{'< '}</span>Students
        </Link>
      </h3>
      <h2 className="pg-header">
        <Link to={`/student/${currentStudent.allIds}`}>
          {currentStudent.byId[currentStudent.allIds].name}
        </Link>
      </h2>
      <ul className="flex px-2 py-2 bg-white border border-gray-400 rounded">
        <li>
          <NavLink
            className="px-2 py-2 mx-1"
            activeClassName="border-b-2 border-blue-400"
            to={`/student/${studentId}/clubs`}
          >
            Clubs
          </NavLink>
        </li>
        <li>
          <NavLink
            className="px-2 py-2 mx-1"
            activeClassName="border-b-2 border-blue-400"
            to={`/student/${studentId}/family`}
          >
            Family
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
