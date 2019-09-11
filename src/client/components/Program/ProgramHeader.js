import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramHeader(props) {
  return (
    <ul>
      <li>
        <Link to={`/program/${props.programId}/students`}>Students</Link>
      </li>
      <li>
        <Link to={`/program/${props.programId}/sessions`}>Sessions</Link>
      </li>
      <li>
        <Link to={`/program/${props.programId}/streamline`}>Streamline</Link>
      </li>
    </ul>
  );
}
