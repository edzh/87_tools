import React from 'react';
import { Link } from 'react-router-dom';

export default function ClubStudentList(props) {
  return (
    <div>
      {props.club.students.map(student => (
        <Link
          className="block no-underline text-blue hover:text-blue-light"
          to={`/student/${student._id}`}
        >
          {student.name}
        </Link>
      ))}
    </div>
  );
}
