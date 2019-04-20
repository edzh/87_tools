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

  const indexedTimesheets = props.timesheets.reduce(
    (timesheetByDay, timesheet) => {
      timesheetByDay[timesheet.date] = timesheetByDay[timesheet.date] || [];
      timesheetByDay[timesheet.date].push({
        _id: timesheet._id,
        io: timesheet.io,
        amount: timesheet.timestamp.length
      });

      return timesheetByDay;
    },
    {}
  );

  const timesheetsByDate = Object.keys(indexedTimesheets)
    .map(key => {
      return {
        date: key,
        timesheets: indexedTimesheets[key]
      };
    })
    .sort((a, b) => {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });

  console.log(indexedTimesheets);
  console.log(timesheetsByDate);

  return (
    <div className="">
      <h2 className="m-2">Timesheets</h2>
      <table className="m-2 border rounded overflow-auto block w-1/3">
        <thead>
          <tr className="border-b border-grey-light">
            <th className="py-1 pl-2 w-32">Date</th>
            <th className="py-1 pl-2 w-64">Type</th>
            <th className="py-1 pl-2 w-32"># of Students</th>
          </tr>
        </thead>
        <tbody className="block" style={{ height: '480px' }}>
          {timesheetsByDate.map((timesheetsDate, index) => {
            return (
              <tr
                key={timesheetsDate.date}
                className="group bg-transparent border-b border-grey-light"
              >
                <td className="pl-2 py-4 w-32">
                  {format(timesheetsDate.date, 'MMMM DD')}
                </td>
                <td className="pl-2 py-4 w-64">
                  {timesheetsDate.timesheets.map(timesheet => {
                    return (
                      <Link
                        key={timesheet._id}
                        className="p-2 mr-2 no-underline border rounded hover:bg-grey-lighter"
                        to={`/timesheet/id/${timesheet._id}`}
                      >
                        {`${timesheet.io === 'in' ? 'Sign in' : 'Sign out'}`}
                      </Link>
                    );
                  })}
                </td>
                <td className="pl-2 py-4 w-32 text-left">
                  {
                    timesheetsDate.timesheets.find(
                      timesheet => timesheet.io === 'in'
                    ).amount
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

{
  /*          return (
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
*/
}
