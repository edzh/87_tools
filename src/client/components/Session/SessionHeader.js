import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramHeader({ sessionId, session }) {
  if (!session.item) return null;

  return (
    <div>
      <h3 className="text-lg">
        <Link to={`/program/${session.item.program}/sessions`}>
          <span className="font-bold text-blue-500">{'< '}</span>Program
        </Link>
      </h3>
      <h2 className="pg-header">
        <Link to={`/session/${session.item._id}`}>{session.item.name}</Link>
      </h2>
      <ul className="flex px-2 py-2 bg-white border border-gray-400 rounded">
        <li>
          <NavLink
            className="px-2 py-2 mx-1"
            activeClassName="border-b-2 border-blue-400"
            to={`/session/${sessionId}/clubs`}
          >
            Clubs
          </NavLink>
        </li>
        <li>
          <NavLink
            className="px-2 py-2 mx-1"
            activeClassName="border-b-2 border-blue-400"
            to={`/session/${sessionId}/timesheets`}
          >
            Timesheets
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
