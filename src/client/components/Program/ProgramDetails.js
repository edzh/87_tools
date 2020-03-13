import React from 'react';
import { Link } from 'react-router-dom';

export default function ProgramDetails({ program, sessions, students }) {
  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.items.map(session => (
          <li key={session._id}>
            <Link to={`/session/${session._id}`}>{session.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
