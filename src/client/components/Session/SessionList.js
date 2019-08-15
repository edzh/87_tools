import React from 'react';
import SessionForm from './SessionForm';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default props => {
  return (
    <div>
      <MainDetailsHeader>Sessions</MainDetailsHeader>
      {props.sessions.map(session => session.name)}
      <SessionForm />
    </div>
  );
};
