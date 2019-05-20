import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from '../../containers/SignOutContainer';

export default function Navbar(props) {
  useEffect(() => {
    props.fetchUserInfo(localStorage.getItem('id_token'));
  }, []);

  return (
    <nav className="border fixed border-r shadow-inner bg-grey-lighter h-full lg:w-64 w-16">
      <h1 className="p-2 text-red text-5xl text-center font-bold">87</h1>
      {!props.isAuthenticated
        ? [
            <NavLink key="0" to="/signin" style={{ color: 'white' }}>
              Sign In
            </NavLink>,
            <NavLink key="1" to="/signup" style={{ color: 'white' }}>
              Sign Up
            </NavLink>
          ]
        : [
            <p key="0" style={{ color: 'white' }}>
              Hi {!props.isFetching && props.user.email}
            </p>,
            <SignOut key="1" />
          ]}
      <NavLink
        activeClassName="border-r-4 border-blue"
        className="py-2 px-4 no-underline text-black block hover:bg-grey-light"
        to={'/addstudent'}
      >
        Add Student
      </NavLink>
      <NavLink
        activeClassName="border-r-4 border-blue"
        className="py-2 px-4 no-underline text-black block hover:bg-grey-light"
        to={'/timesheet'}
      >
        Timesheets
      </NavLink>
      <NavLink
        activeClassName="border-r-4 border-blue"
        className="py-2 px-4 no-underline text-black block hover:bg-grey-light"
        to={'/family'}
      >
        Family
      </NavLink>
      <NavLink
        activeClassName="border-r-4 border-blue"
        className="py-2 px-4 no-underline text-black block hover:bg-grey-light"
        to={'/club'}
      >
        Club
      </NavLink>
    </nav>
  );
}
