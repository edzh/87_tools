import React from 'react';
import { Link } from 'react-router-dom';

import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ClubStudentList(props) {
  return (
    <div className="border shadow-md my-4">
      <div className="flex border-b">
        <h3 className="m-4">Students</h3>
      </div>
      <div className="m-4">
        {props.club.students &&
          props.club.students.map(student => (
            <Link
              className="block no-underline text-blue hover:text-blue-light"
              to={`/student/${student._id}`}
            >
              {student.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
