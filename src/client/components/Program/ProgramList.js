import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramList({ programs, updateUser, user }) {
  return (
    <div>
      <h2 className=""></h2>
      <ul className="">
        {programs.items.map(program => (
          <li key={program._id}>
            <Link
              onClick={() =>
                updateUser({ ...user, currentProgram: program._id })
              }
              to={`/program/${program._id}`}
            >
              {program.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
