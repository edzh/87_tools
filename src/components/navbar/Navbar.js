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
        <li>
          <NavLink to={'/timesheet'}>Timesheet</NavLink>
        </li>
        <li>
          <NavLink to={'/family'}>Family</NavLink>
        </li>
      </ul>
    </div>
  );
}
