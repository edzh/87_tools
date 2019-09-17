import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramList(props) {
  return (
    <div>
      <MainDetailsHeader>Programs</MainDetailsHeader>
      <ul className="">
        {props.programs.items.map(program => (
          <li key={program._id}>
            <Link to={`/program/${program._id}`}>{program.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
// onClick={() => props.updateUser({...props.user, currentProgram: program._id})}
