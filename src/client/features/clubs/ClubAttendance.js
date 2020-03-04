import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO, startOfDay, getDay } from 'date-fns';

import { fetchTimestampsByClub, fetchTimesheetsBySession } from './clubSlice';
import { getCurrentSession } from 'client/actions/sessionActions';

export default function ClubAttendance({ match }) {
  const [timesheet, setTimesheet] = useState('');
  const dispatch = useDispatch();
  const clubPage = useSelector(state => state.clubPage);
  const clubId = match.params.id;
  const club = clubPage.item;
  const timestamps = useSelector(state => state.clubPage.timestamps);
  const timesheets = clubPage.timesheets;
  const timesheetsByClubDay = timesheets.allIds
    .filter(timesheetId => {
      const timesheetIsSignin = timesheets.byId[timesheetId].io === 'in';
      const timesheetDay = getDay(parseISO(timesheets.byId[timesheetId].date));
      const clubDay = +club.byId[club.allIds].day;

      return timesheetDay === clubDay && timesheetIsSignin;
    })
    .sort(
      (timesheetIdA, timesheetIdB) =>
        timesheets.byId[timesheetIdA].date - timesheets.byId[timesheetIdB].date
    );

  const students = useSelector(state => state.students.items);
  const session = useSelector(state => state.currentSession.item);
  const timestampsByClub = clubPage.timestamps;
  const clubStudentsByTimesheet = timestampsByClub.allIds
    .filter(
      timestampId => timestampsByClub.byId[timestampId].timesheet === timesheet
    )
    .map(timestampId => timestampsByClub.byId[timestampId].student);

  useEffect(() => {
    async function fetchData() {
      try {
        await Promise.all([
          dispatch(fetchTimestampsByClub(clubId)),
          dispatch(fetchTimesheetsBySession(club.byId[clubId].session._id)),
          dispatch(getCurrentSession(club.byId[clubId].session._id))
        ]);
      } catch (err) {
        console.error(err);
      }
    }
    club.byId[clubId] && fetchData();
  }, [clubId, club]);

  if (!students.allIds.length) return null;

  return (
    <div className="bg-white border rounded shadow w-64">
      <div className="px-4 pt-3 pb-1 border-b">
        <label className="mr-2" htmlFor="timesheet">
          Timesheet
        </label>
        <select
          id="timesheet"
          className="form-input"
          onChange={e => setTimesheet(e.target.value)}
        >
          <option value="">---</option>
          {timesheetsByClubDay.map(timesheetId => (
            <option key={timesheetId} value={timesheetId}>
              {format(
                parseISO(timesheets.byId[timesheetId].date),
                'MMM dd, yyyy'
              )}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`${timesheet ? '' : 'bg-gray-100'} overflow-auto`}
        style={{ height: '24rem' }}
      >
        {timesheet ? (
          clubPage.students.allIds.map(studentId => {
            const isSignedIn = clubStudentsByTimesheet.indexOf(studentId) > -1;

            return (
              <div
                className={`${
                  isSignedIn ? 'text-green-500' : 'text-red-500'
                } px-4 py-1 border-b`}
                key={studentId}
              >
                {students.byId[studentId].name}
              </div>
            );
          })
        ) : (
          <div className="text-center p-4 text-gray-600">
            Select a timesheet
          </div>
        )}
      </div>
    </div>
  );
}
