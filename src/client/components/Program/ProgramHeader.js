import React from 'react';
import { NavLink } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';
import Navbar from './Navbar';

export default function ProgramHeader({ currentProgram }) {
  return (
    <div>
      <h2 className="text-lg">
        <NavLink to={`/program/${currentProgram.item._id}`}>
          {currentProgram.item.name}
        </NavLink>
      </h2>
      <Navbar currentProgram={currentProgram} />
    </div>
  );
}
