import React, { useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramForm from './ProgramForm';
import ProgramHeader from './ProgramHeader';

export default function Program({
  fetchUserPrograms,
  programs,
  user,
  updateUser,
  ...props
}) {
  useEffect(() => {
    fetchUserPrograms();
  }, []);

  return (
    <div>
      <h1 className="pg-header">Programs</h1>
      <ProgramList
        {...props}
        programs={programs.items}
        updateUser={updateUser}
        user={user}
      />
    </div>
  );
}
