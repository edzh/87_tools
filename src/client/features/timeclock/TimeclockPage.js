import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTimestampsByTimesheet,
  getClubsBySessionDay,
  getTimesheetById
} from 'client/features/timeclock/timeclockSlice';
import {
  getStudentsByProgram,
  getStudentsByClub
} from 'client/actions/studentActions';
import { getClubsBySession } from 'client/actions/clubActions';
import { format } from 'date-fns';

export default function TimeclockPage({ match }) {
  const timesheetId = match.params.id;
  const dispatch = useDispatch();
  const programId = useSelector(state => state.user.item.currentProgram);
  const currentTimesheet = useSelector(
    state => state.timeclock.timesheets.byId[timesheetId]
  );
  const sessionId = currentTimesheet ? currentTimesheet.session : null;
  const clubs = useSelector(state => state.clubs.items);
  const clubsToday = useSelector(state => state.timeclock.clubs);
  const students = useSelector(state => state.students.items);
  const timestamps = useSelector(state => state.timeclock.timestamps);

  const [currentClub, setCurrentClub] = useState(
    clubs.byId[clubsToday.allIds[0]]
  );

  useEffect(() => {
    Promise.all([
      dispatch(getTimestampsByTimesheet(timesheetId)),
      sessionId &&
        dispatch(getClubsBySessionDay(sessionId, format(new Date(), 'i') % 7)),
      sessionId && dispatch(getClubsBySession(sessionId)),
      // programId && dispatch(getStudentsByProgram(programId)),
      dispatch(getTimesheetById(timesheetId))
    ]);
  }, [timesheetId, sessionId, programId]);

  useEffect(() => {
    currentClub && dispatch(getStudentsByClub(currentClub._id));
  }, [currentClub, clubs]);
  currentClub && console.log(currentClub.name);
  return (
    <>
      <select
        onChange={e => setCurrentClub(clubs.byId[e.target.value])}
        type="select"
      >
        {clubs.allIds.length !== 0 &&
          clubsToday.allIds.map(clubId => (
            <option value={clubId}>{clubs.byId[clubId].name}</option>
          ))}
      </select>
      <div>
        {students.allIds.map(studentId => (
          <div>{students.byId[studentId].name}</div>
        ))}
      </div>
    </>
  );
}
