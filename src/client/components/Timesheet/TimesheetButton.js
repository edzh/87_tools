import React from 'react';
import { Link } from 'react-router-dom';

export default ({ timesheet }) => {
  return (
    <Link to={`/timesheet/${timesheet._id}`}>
      <button className="p-2 mx-2 shadow border rounded hover:bg-gray-200">{`${
        timesheet.io === 'in' ? 'Sign in' : 'Sign out'
      }`}</button>
    </Link>
  );
};
