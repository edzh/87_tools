import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from './SessionForm';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default props => {
  return (
    <div>
      <ul className="list-reset">
        {props.sessions.items.map(session => (
          <li key={session._id}>
            <Link to={`/session/${session._id}`}>{session.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
