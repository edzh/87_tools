import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramHeader(props) {
  return (
    <ul>
      <li>
        <Link to={`/session/${props.sessionId}/clubs`}>Clubs</Link>
      </li>
      <li>
        <Link to={`/session/${props.sessionId}/timesheets`}>Timesheets</Link>
      </li>
    </ul>
  );
}
