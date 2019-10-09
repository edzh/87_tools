import React from 'react';
import { Link } from 'react-router-dom';
import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ProgramList({ programs, updateUser, user }) {
  return (
    <div>
      <ul className="flex">
        {programs.items.map(program => (
          <li key={program._id}>
            <Link
              className="pt-2 pl-4 pb-8 my-2 mr-2 w-64 h-24 btn hover:bg-blue-400 text-lg font-bold"
              onClick={() =>
                updateUser({ ...user, currentProgram: program._id })
              }
              to={`/program/${program._id}`}
            >
              {program.name}
            </Link>
          </li>
        ))}
        <li>
          <button className="text-5xl h-24 text-blue-500 hover:text-blue-400">
            +
          </button>
        </li>
      </ul>
    </div>
  );
}
