import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramDetails({ program }) {
  return (
    <div>
      <MainDetailsHeader>{program.item.name}</MainDetailsHeader>
      <ul>
        {program.sessions.map(session => (
          <li>
            <Link to={`/session/${session._id}`}>{session.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
