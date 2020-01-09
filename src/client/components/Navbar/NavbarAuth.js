import React from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from '../../containers/SignOutContainer';

export default function NavbarAuth({ isAuthenticated, isFetching, user }) {
  if (!user._id) return null;

  return !isAuthenticated ? (
    <div className="bg-gray-400 mb-4 px-4 py-2">
      <NavLink
        className="py-2 no-underline text-blue-500 hover:text-blue-400 text-sm block"
        to="/signin"
      >
        Sign In
      </NavLink>
      <NavLink
        className="py-2 no-underline text-blue-500 hover:text-blue-400 text-sm block"
        to="/signup"
      >
        Sign Up
      </NavLink>
    </div>
  ) : (
    <div className="bg-gray-400 mb-4 px-4 py-2">
      <p className="py-2 text-sm">Hi {user.email}</p>
      <SignOut key="1" />
    </div>
  );
}
