import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Navbar({ timesheetId }) {
  const timesheet = useSelector(state => state.timeclock.timesheets);

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
      {timesheet.byId[timesheetId].io === 'in' && (
        <li>
          <NavLink
            className="px-2 py-2 mx-1"
            activeClassName="border-b-2 border-blue-400"
            to={`/timesheet/${timesheetId}/attendance`}
          >
            Attendance
          </NavLink>
        </li>
      )}
    </ul>
  );
}
