import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Student(props) {
  return (
    <ul
      className="overflow-auto pr-4 border-t border-b border-gray-400"
      style={{ height: '360px' }}
    >
      {props.students.items &&
        props.students.items.map((student, index) => (
          <li
            className="mb-1 rounded border border-gray-400 bg-white px-2 py-1"
            key={student._id}
          >
            <Link
              className="text-blue-600 text-sm hover:text-blue-400"
              to={`/student/${student._id}`}
            >
              {student.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
