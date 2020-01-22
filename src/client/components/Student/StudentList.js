import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Student({ students }) {
  if (!students.allIds.length) return null;

  return (
    <ul
      className="overflow-auto pr-4 border-t border-b border-gray-400"
      style={{ height: '360px' }}
    >
      {students.allIds.map(studentId => (
        <li
          className="mb-1 rounded border border-gray-400 bg-white px-2 py-1"
          key={studentId}
        >
          <Link
            className="text-blue-600 text-sm hover:text-blue-400"
            to={`/student/${studentId}`}
          >
            {students.byId[studentId].name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
