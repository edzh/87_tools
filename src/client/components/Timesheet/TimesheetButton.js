import React from 'react';
import { Link } from 'react-router-dom';

export default ({ timesheet }) => {
  return (
    <Link
      className="mr-2 py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-400"
      to={`/timesheet/${timesheet._id}/timeclock`}
    >
      {`${timesheet.io === 'in' ? 'Sign in' : 'Sign out'}`}
    </Link>
  );
};
