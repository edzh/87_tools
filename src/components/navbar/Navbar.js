import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={'/postcare'}>Postcare</NavLink>
        </li>
      </ul>
    </div>
  );
}
