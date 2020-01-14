import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ClubStudentList() {
  const students = useSelector(state => state.clubPageReducer.students);
  if (!students.allIds.length) return null;

  return (
    <div className="m-4">
      {students.allIds.map(studentId => (
        <Link
          key={studentId}
          className="block no-underline text-blue-500 hover:text-blue-400"
          to={`/student/${studentId}`}
        >
          {students.byId[studentId].name}
        </Link>
      ))}
    </div>
  );
}
