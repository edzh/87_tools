import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Student({ studentId, student }) {
  if (!student.item) return null;

  console.log(student.item[student.byId]);

  return (
    <div>
      <h3 className="text-lg">
        <Link to={`/program/${student.byId}/students`}>
          <span className="font-bold text-blue-500">{'< '}</span>Students
        </Link>
      </h3>
      <h2 className="pg-header">
        <Link to={`/student/${student.byId}`}>
          {student.item[student.byId].name}
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
