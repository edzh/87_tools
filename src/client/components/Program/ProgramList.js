import React from 'react';
import ProgramForm from './ProgramForm';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default props => {
  return (
    <div>
      <MainDetailsHeader>Programs</MainDetailsHeader>
      <ul className="list-reset">
        {props.programs.items.map(program => (
          <li>{program.name}</li>
        ))}
      </ul>
      <ProgramForm user={props.user} />
    </div>
  );
};
