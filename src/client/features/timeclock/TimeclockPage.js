import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTimestampsByTimesheet,
  getClubsBySessionDay,
  getTimesheetById
} from 'client/features/timeclock/timeclockSlice';
import { getStudentsByProgram } from 'client/actions/studentActions';
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
  const sessionClubs = useSelector(state => state.timeclock.clubs);

  useEffect(() => {
    Promise.all([
      dispatch(getTimestampsByTimesheet(timesheetId)),
      sessionId &&
        dispatch(getClubsBySessionDay(sessionId, format(new Date(), 'i') % 7)),
      sessionId && dispatch(getClubsBySession(sessionId)),
      programId && dispatch(getStudentsByProgram(programId)),
      dispatch(getTimesheetById(timesheetId))
    ]);
  }, [timesheetId, sessionId, programId]);

  return (
    <div>
      {clubs.allIds.length !== 0
        ? sessionClubs.allIds.map(clubId => <div>{clubs[clubId].name}</div>)
        : null}
    </div>
  );
}
