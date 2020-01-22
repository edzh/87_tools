import React from 'react';

export default function StudentAlert({ students, recentStudent }) {
  if (!recentStudent) return null;

  return (
    <div className="my-2 p-2 text-green-800 bg-green-200 rounded border-l-2 border-green-400">
      {students.byId[recentStudent].name} has been created!
    </div>
  );
}
