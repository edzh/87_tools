import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ currentProgram }) {
  return (
    <ul className="flex px-2 py-2 bg-gray-200 rounded-lg">
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/program/${currentProgram.item._id}/students`}
        >
          Students
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/program/${currentProgram.item._id}/sessions`}
        >
          Sessions
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/program/${currentProgram.item._id}/families`}
        >
          Families
        </NavLink>
      </li>
      {/*<li>
              <NavLink
                className="px-2 py-2 mx-1"
                activeClassName="border-b-2 border-blue-400"
                to={`/program/${currentProgram.item._id}/streamline`}
              >
                Streamline
              </NavLink>
            </li>*/}
    </ul>
  );
}
