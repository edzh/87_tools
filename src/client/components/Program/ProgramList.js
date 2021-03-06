import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgramForm from './ProgramForm';

export default function ProgramList({
  programs,
  updateUser,
  user,
  addProgram
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <ul className="flex flex-wrap">
        {!!programs.allIds.length &&
          programs.allIds.map(programId => (
            <li key={programId}>
              <Link
                className="pt-2 pl-4 pb-8 my-2 mr-2 w-64 h-24 btn block hover:bg-blue-400 text-lg font-bold"
                onClick={() =>
                  updateUser({ ...user, currentProgram: programId })
                }
                to={`/program/${programId}`}
              >
                {programs.byId[programId].name}
              </Link>
            </li>
          ))}

        {showForm ? (
          <li className="h-24">
            <ProgramForm
              user={user}
              addProgram={addProgram}
              setShowForm={setShowForm}
            />
          </li>
        ) : (
          <li>
            <button
              onClick={() => setShowForm(true)}
              className="text-5xl h-24 text-blue-500 hover:text-blue-400"
            >
              +
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
