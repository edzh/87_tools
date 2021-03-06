import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ programId }) {
  return (
    <ul className="flex px-2 py-2 bg-white border border-gray-400 rounded">
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/program/${programId}/students`}
        >
          Students
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/program/${programId}/sessions`}
        >
          Sessions
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/program/${programId}/families`}
        >
          Families
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          to={`/program/${programId}/streamline`}
          activeClassName="border-b-2 border-blue-400"
        >
          Streamline
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          to={`/program/${programId}/pin`}
          activeClassName="border-b-2 border-blue-400"
        >
          PIN
        </NavLink>
      </li>
    </ul>
  );
}
