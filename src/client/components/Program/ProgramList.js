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
              className="pt-2 pl-4 pb-8 my-2 mr-2 w-64 rounded hover:bg-blue-200 bg-blue-100 block text-blue-800 font-bold"
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
          <button className="text-5xl text-blue-800 hover:text-blue-700">
            +
          </button>
        </li>
      </ul>
    </div>
  );
}
