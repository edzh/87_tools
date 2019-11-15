import React from 'react';
import { Link } from 'react-router-dom';

export default function FamilyList(props) {
  return (
    <ul
      className="overflow-auto pr-4 border-t border-b border-gray-400"
      style={{ height: '360px' }}
    >
      {props.families.items &&
        props.families.items.map((family, index) => (
          <li
            key={family._id}
            className="mb-1 rounded border border-gray-400 bg-white px-2 py-1"
          >
            <Link
              to={`/family/${family._id}`}
              className="text-blue-600 text-sm hover:text-blue-400"
            >
              {family.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
