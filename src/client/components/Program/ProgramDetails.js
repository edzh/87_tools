import React from 'react';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramDetails({ program }) {
  return (
    <div>
      <MainDetailsHeader>{program.item.name}</MainDetailsHeader>
      <ul>
        {program.sessions.map(session => (
          <li>{session.name}</li>
        ))}
      </ul>
    </div>
  );
}
