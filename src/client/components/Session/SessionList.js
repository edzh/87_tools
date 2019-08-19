import React from 'react';
import SessionForm from './SessionForm';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default props => {
  return (
    <div>
      <MainDetailsHeader>Sessions</MainDetailsHeader>
      <ul className="list-reset">
        {props.sessions.map(session => (
          <li>{session.name}</li>
        ))}
      </ul>
      <SessionForm />
    </div>
  );
};
