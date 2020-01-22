import React from 'react';
import { Link } from 'react-router-dom';

export default function FamilyList({ families }) {
  return (
    <ul
      className="overflow-auto pr-4 border-t border-b border-gray-400"
      style={{ height: '360px' }}
    >
      {families.allIds.map(familyId => (
        <li
          key={familyId}
          className="mb-1 rounded border border-gray-400 bg-white px-2 py-1"
        >
          <Link
            to={`/family/${familyId}`}
            className="text-blue-600 text-sm hover:text-blue-400"
          >
            {families.byId[familyId].name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
