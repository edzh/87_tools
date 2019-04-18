import React from 'react';
import { apiUrl } from 'config';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import MakePdf from 'data/MakePdf';

import styles from './css/TimesheetList.module.css';

export default function TimesheetList(props) {
  if (props.isFetching && props.timesheets === null) {
    return <p>Loading...</p>;
  }

  const deleteTimesheet = async timesheetId => {
    try {
      const timesheet = await fetch(`${apiUrl}/api/timesheet/${timesheetId}`, {
        method: 'DELETE'
      });

      return timesheet;
    } catch (e) {
      return Promise.reject();
    }
  };

  return (
    <table className="overflow-auto w-full block">
      <thead>
        <tr className="border-b border-grey-light">
          <th className="py-1 pl-2">Date</th>
          <th className="py-1 pl-2">Quantity</th>
          <th className="py-1 pl-2">Type</th>
          <th className="py-1 pl-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.timesheets.map((timesheet, index) => {
          return (
            <tr
              key={timesheet._id}
              className="group bg-transparent hover:bg-grey-lighter border-b border-grey-light"
            >
              <td className="py-1 pl-2">
                <Link to={`/timesheet/id/${timesheet._id}`}>
                  {format(new Date(timesheet.date), 'MMMM DD')}
                </Link>
              </td>
              <td className="py-1 pl-2">{timesheet.timestamp.length}</td>
              <td className="py-1 pl-2">
                {timesheet.io === 'in' ? 'Sign In' : 'Sign Out'}
              </td>
              <td className="py-1 pl-2">
                <button
                  className="group-hover:visible invisible"
                  onClick={() => deleteTimesheet(timesheet._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <MakePdf timesheetId={timesheet._id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
