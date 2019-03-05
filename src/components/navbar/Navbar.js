import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={'/pinlookup'}>Pin Lookup</NavLink>
        </li>
        <li>
          <NavLink to={'/addstudent'}>Add Student</NavLink>
        </li>
      </ul>
    </div>
  );
}
