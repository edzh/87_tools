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
  const timesheetsByClubDay = timesheets.allIds.filter(
    timesheetId =>
      getDay(parseISO(timesheets.byId[timesheetId].date)) ===
        +club.byId[club.allIds].day && timesheets.byId[timesheetId].io === 'in'
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
    <div>
      <select onChange={e => setTimesheet(e.target.value)}>
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
      <div>
        {clubPage.students.allIds.map(studentId => {
          const isSignedIn = clubStudentsByTimesheet.indexOf(studentId) > -1;

          return (
            <div
              className={isSignedIn ? 'text-green-500' : 'text-red-500'}
              key={studentId}
            >
              {students.byId[studentId].name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
