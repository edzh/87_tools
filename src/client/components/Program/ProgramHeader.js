import React from 'react';
import { NavLink } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';
import Navbar from './Navbar';

export default function ProgramHeader({ currentProgram, programId }) {
  return (
    <div>
      <h2 className="pg-header">
        <NavLink to={`/program/${programId}`}>
          {currentProgram.item.name}
        </NavLink>
      </h2>
      <Navbar programId={programId} />
    </div>
  );
}
