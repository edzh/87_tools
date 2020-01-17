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
import { format, parseISO } from 'date-fns';

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
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-gray-700">Attendance</h2>
      {currentTimesheet && (
        <h3 className="">
          {format(parseISO(currentTimesheet.date), 'EEEE, MMMM dd, yyyy')}
        </h3>
      )}
      <div className="flex">
        <select
          onChange={e => setCurrentClub(clubs.byId[e.target.value])}
          type="select"
          className="rounded p-1 border mt-2"
        >
          <option value="">---</option>
          {clubs.allIds.length !== 0 &&
            clubsToday.allIds.map(clubId => (
              <option key={clubId} value={clubId}>
                {clubs.byId[clubId].name}
              </option>
            ))}
        </select>
        <div className="block flex mt-3 ml-2">
          <div className="bg-green-500 w-4 h-4 rounded-full mt-1 mx-2"></div>
          <p>Present</p>
          <div className="bg-red-500 w-4 h-4 rounded-full mt-1 ml-6 mr-2"></div>
          <p>Absent</p>
        </div>
      </div>
      <div className="mt-2 border-t border-l border-r rounded">
        {students.allIds.map(studentId =>
          timestamps.studentIds.indexOf(studentId) > -1 ? (
            <div
              key={studentId}
              className="py-1 px-2 hover:bg-gray-200 border-b border-gray-400 text-green-500 cursor-pointer"
              onClick={() => handleRemoveTimestamp(studentId)}
            >
              {students.byId[studentId].name}
            </div>
          ) : (
            <div
              key={studentId}
              className="py-1 px-2 hover:bg-gray-200 border-b border-gray-400 text-red-500 cursor-pointer"
              onClick={() => handleTimestamp(studentId)}
            >
              {students.byId[studentId].name}
            </div>
          )
        )}
      </div>
    </div>
  );
}
