import React from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from '../../containers/SignOutContainer';

export default ({ isAuthenticated, isFetching, user }) => {
  return !isAuthenticated ? (
    <div className="bg-grey-light mb-4 px-4 py-2">
      <NavLink
        className="py-2 no-underline text-blue hover:text-blue-light text-sm block"
        to="/signin"
      >
        Sign In
      </NavLink>
      <NavLink
        className="py-2 no-underline text-blue hover:text-blue-light text-sm block"
        to="/signup"
      >
        Sign Up
      </NavLink>
    </div>
  ) : (
    <div className="bg-grey-light mb-4 px-4 py-2">
      <p className="py-2 text-sm">Hi {!isFetching && user.email}</p>
      <SignOut key="1" />
    </div>
  );
};
