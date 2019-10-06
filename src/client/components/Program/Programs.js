import React, { useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramForm from './ProgramForm';
import ProgramHeader from './ProgramHeader';

export default function Program({
  fetchPrograms,
  programs,
  user,
  updateUser,
  addProgram
}) {
  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div>
      <h1 className="pg-header">Programs</h1>
      <ProgramList programs={programs} updateUser={updateUser} user={user} />
      <ProgramForm user={user} addProgram={addProgram} />
    </div>
  );
}
