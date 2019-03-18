import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

export default function Navbar(props) {
  return (
    <nav>
      <h1 className={styles.logo}>87</h1>
      <NavLink className={styles.link} to={'/pinlookup'}>
        Pin Lookup
      </NavLink>
      <NavLink className={styles.link} to={'/addstudent'}>
        Add Student
      </NavLink>
      <NavLink className={styles.link} to={'/timesheet'}>
        Timesheet
      </NavLink>
      <NavLink className={styles.link} to={'/family'}>
        Family
      </NavLink>
      <NavLink className={styles.link} to={'/club'}>
        Club
      </NavLink>
    </nav>
  );
}
