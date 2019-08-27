import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramDetails({ program, sessions, students }) {
  return (
    <div>
      <MainDetailsHeader>{program.item.name}</MainDetailsHeader>
      <h2>Sessions</h2>
      <ul>
        {sessions.items.map(session => (
          <li key={session._id}>
            <Link to={`/session/${session._id}`}>{session.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            <Link to={`/student/${student._id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
