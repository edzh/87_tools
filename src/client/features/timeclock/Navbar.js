import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ timesheetId }) {
  return (
    <ul className="flex px-2 py-2 bg-white border border-gray-400 rounded">
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/timesheet/${timesheetId}/timeclock`}
        >
          Timeclock
        </NavLink>
      </li>
      <li>
        <NavLink
          className="px-2 py-2 mx-1"
          activeClassName="border-b-2 border-blue-400"
          to={`/timesheet/${timesheetId}/attendance`}
        >
          Attendance
        </NavLink>
      </li>
    </ul>
  );
}
