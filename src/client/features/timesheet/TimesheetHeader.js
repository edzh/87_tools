import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { getTimesheetById } from './timeclockSlice';
import { format, parseISO } from 'date-fns';

export default function TimeclockHeader({ timesheetId }) {
  const dispatch = useDispatch();
  const currentTimesheet = useSelector(state => state.timeclock.timesheets);

  useEffect(() => {
    dispatch(getTimesheetById(timesheetId));
  }, [timesheetId]);

  if (currentTimesheet.allIds !== timesheetId) return null;

  return (
    <div>
      <h2 className="">
        <NavLink
          to={`/session/${currentTimesheet.byId[timesheetId].session}/timesheets`}
        >
          Back
        </NavLink>
      </h2>
      <h2 className="pg-header">
        {format(
          parseISO(currentTimesheet.byId[timesheetId].date),
          'eeee, MMMM dd, yyyy'
        )}
      </h2>
      <Navbar timesheetId={timesheetId} />
    </div>
  );
}
