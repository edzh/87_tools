import React from 'react';
import { Link } from 'react-router-dom';

export default ({ timesheet }) => {
  return (
    <Link to={`/timesheet/id/${timesheet._id}`}>
      <button className="p-2 mr-2 shadow border rounded hover:bg-grey-lighter">{`${
        timesheet.io === 'in' ? 'Sign in' : 'Sign out'
      }`}</button>
    </Link>
  );
};
