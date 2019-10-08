import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Student(props) {
  return (
    <ul className="overflow-auto" style={{ height: '360px' }}>
      {props.students.items &&
        props.students.items.map((student, index) => (
          <li
            className="border-b hover:bg-gray-100 p-1 border-gray-600"
            key={student._id}
          >
            <Link
              className="text-blue-600 hover:text-blue-400"
              to={`/student/${student._id}`}
            >
              {student.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
