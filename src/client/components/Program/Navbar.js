import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ currentProgram }) {
  return (
    <ul className="flex">
      <li>
        <NavLink
          activeClassName="bg-blue-500"
          to={`/program/${currentProgram.item._id}/students`}
        >
          Students
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="bg-blue-500"
          to={`/program/${currentProgram.item._id}/sessions`}
        >
          Sessions
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="bg-blue-500"
          to={`/program/${currentProgram.item._id}/families`}
        >
          Families
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="bg-blue-500"
          to={`/program/${currentProgram.item._id}/streamline`}
        >
          Streamline
        </NavLink>
      </li>
    </ul>
  );
}
