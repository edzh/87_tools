import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, format, addHours } from 'date-fns';
import {
  fetchTimestampsByDateRange,
  fetchAllTimesheets,
  fetchStudentsByProgram,
  fetchSessionsByProgram,
  fetchAllClubs
} from './auditSlice';
import './Audit.css';

export default function Audit({ match }) {
  const dispatch = useDispatch();
  const programId = useSelector(state => state.user.item.currentProgram);
  const start = match.params.start;
  const end = match.params.end;
  const timestamps = useSelector(state => state.auditPage.timestamps);
  const students = useSelector(state => state.auditPage.students);
  const clubs = useSelector(state => state.auditPage.clubs);
  const timesheets = useSelector(state => state.auditPage.timesheets);

  useEffect(() => {
    async function fetchData() {
      try {
        await Promise.all([
          programId && dispatch(fetchStudentsByProgram(programId)),
          programId && dispatch(fetchAllClubs()),
          programId && dispatch(fetchSessionsByProgram(programId)),
          dispatch(fetchAllTimesheets()),
          dispatch(fetchTimestampsByDateRange(start, end))
        ]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [programId]);

  if (!timestamps.allIds.length) return null;
  if (!students.allIds.length) return null;
  if (!clubs.allIds.length) return null;
  if (!timesheets.allIds.length) return null;

  return (
    <table className="">
      <thead className="text-xs font-bold">
        <tr>
          <th className="text-lg" colspan="4">
            87 Afterschool {start} - {end}
          </th>
        </tr>
        <tr>
          <th className="text-left pr-4">Date/Time</th>
          <th className="text-left pr-4 capitalize">In/Out</th>
          <th className="text-left pr-4">Student Name</th>
          <th className="text-left pr-4">Student Club</th>
        </tr>
      </thead>

      <tbody className="pt-4">
        {timestamps.allIds.map(timestampId => {
          const studentId = timestamps.byId[timestampId].student;
          const clubId = timestamps.byId[timestampId].club;
          const timesheetId = timestamps.byId[timestampId].timesheet;

          return (
            <tr className="text-xs">
              <td className="pr-4 leading-none">
                {format(
                  addHours(
                    parseISO(timestamps.byId[timestampId].datetime),
                    -13
                  ),
                  'PPpp'
                )}
              </td>
              <td className="pr-4 leading-none capitalize">
                {timesheets.byId[timesheetId]
                  ? timesheets.byId[timesheetId].io
                  : 'No IO'}
              </td>
              <td className="pr-4 leading-none">
                {students.byId[studentId]
                  ? students.byId[studentId].name
                  : 'No name'}
              </td>
              <td className="pr-4 leading-none">
                {clubs.byId[clubId] ? clubs.byId[clubId].name : 'No club'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
