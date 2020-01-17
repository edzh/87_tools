import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTimestampsByTimesheet,
  getClubsBySessionDay,
  getTimesheetById,
  addTimestamp,
  deleteTimestamp
} from 'client/features/timeclock/timeclockSlice';
import {
  getStudentsByProgram,
  getStudentsByClub
} from 'client/actions/studentActions';
import { getClubsBySession } from 'client/actions/clubActions';
import { format } from 'date-fns';

export default function TimeclockPage({ match }) {
  const dispatch = useDispatch();
  const timesheetId = match.params.id;
  const programId = useSelector(state => state.user.item.currentProgram);
  const currentTimesheet = useSelector(
    state => state.timeclock.timesheets.byId[timesheetId]
  );
  const sessionId = currentTimesheet ? currentTimesheet.session : null;
  const clubs = useSelector(state => state.clubs.items);
  const clubsToday = useSelector(state => state.timeclock.clubs);
  const students = useSelector(state => state.students.items);
  const timestamps = useSelector(state => state.timeclock.timestamps);

  const [currentClub, setCurrentClub] = useState('');

  useEffect(() => {
    Promise.all([
      dispatch(getTimestampsByTimesheet(timesheetId)),
      sessionId &&
        dispatch(getClubsBySessionDay(sessionId, format(new Date(), 'i') % 7)),
      sessionId && dispatch(getClubsBySession(sessionId)),
      dispatch(getTimesheetById(timesheetId))
    ]);
  }, [timesheetId, sessionId, programId]);

  useEffect(() => {
    currentClub && dispatch(getStudentsByClub(currentClub._id));
  }, [currentClub, clubs]);

  function handleTimestamp(studentId) {
    dispatch(
      addTimestamp({
        student: studentId,
        club: currentClub._id,
        fobStatus: 'DNF',
        timesheet: timesheetId
      })
    );
  }

  function handleRemoveTimestamp(studentId) {
    const timestampId = timestamps.allIds.find(
      id => timestamps.byId[id].student._id === studentId
    );
    dispatch(deleteTimestamp(timestampId));
  }

  return (
    <>
      <select
        onChange={e => setCurrentClub(clubs.byId[e.target.value])}
        type="select"
      >
        <option value="">---</option>
        {clubs.allIds.length !== 0 &&
          clubsToday.allIds.map(clubId => (
            <option value={clubId}>{clubs.byId[clubId].name}</option>
          ))}
      </select>
      <div>
        {students.allIds.map(studentId =>
          timestamps.studentIds.indexOf(studentId) > -1 ? (
            <div
              key={studentId}
              className="text-green-500"
              onClick={() => handleRemoveTimestamp(studentId)}
            >
              {students.byId[studentId].name}
            </div>
          ) : (
            <div
              key={studentId}
              className="text-red-500"
              onClick={() => handleTimestamp(studentId)}
            >
              {students.byId[studentId].name}
            </div>
          )
        )}
      </div>
    </>
  );
}
