import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ currentProgram }) {
  return (
    <ul className="flex px-2 py-3 bg-gray-200 rounded-lg">
      <li>
        <NavLink
          className="px-2 py-1 mx-1 rounded"
          activeClassName="bg-blue-500 text-blue-100"
          to={`/program/${currentProgram.item._id}/students`}
        >
          Students
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-1 mx-1 rounded"
          activeClassName="bg-blue-500 text-blue-100"
          to={`/program/${currentProgram.item._id}/sessions`}
        >
          Sessions
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-1 mx-1 rounded"
          activeClassName="bg-blue-500 text-blue-100"
          to={`/program/${currentProgram.item._id}/families`}
        >
          Families
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-1 mx-1 rounded"
          activeClassName="bg-blue-500 text-blue-100"
          to={`/program/${currentProgram.item._id}/streamline`}
        >
          Streamline
        </NavLink>
      </li>
    </ul>
  );
}
