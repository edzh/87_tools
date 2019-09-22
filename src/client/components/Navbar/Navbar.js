import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import NavbarAuth from './NavbarAuth';

function Navbar({ fetchUserInfo, isAuthenticated, isFetching, user }) {
  // useEffect(() => {
  //   fetchUserInfo(localStorage.getItem('id_token'));
  // }, []);

  return (
    <nav className="border fixed border-r shadow-inner bg-gray-200 h-full lg:w-64 w-16">
      <h1 className="p-2 text-red-500 text-5xl text-center font-bold">87</h1>
      <NavbarAuth
        isAuthenticated={isAuthenticated}
        isFetching={isFetching}
        user={user}
      />
      <NavLink
        activeClassName="border-r-4 border-blue-500"
        className="py-2 px-4 no-underline text-black block hover:bg-grey-light"
        to={'/program'}
      >
        Program
      </NavLink>
    </nav>
  );
}

export default Navbar;
