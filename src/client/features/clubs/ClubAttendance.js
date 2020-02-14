import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, startOfDay } from 'date-fns';

import { fetchTimestampsByClub } from './clubSlice';
import { getCurrentSession } from 'client/actions/sessionActions';

export default function ClubAttendance({ match }) {
  const dispatch = useDispatch();
  const clubPage = useSelector(state => state.clubPage);
  const clubId = match.params.id;
  const club = clubPage.item;
  const timestamps = useSelector(state => state.clubPage.timestamps);
  const students = useSelector(state => state.students.items);
  const session = useSelector(state => state.currentSession.item);
  const timesheetIds = timestamps.allIds.reduce((timesheets, timestampId) => {
    const timesheet = timestamps.byId[timestampId].timesheet;
    if (timesheets.indexOf(timesheet) > -1) {
      return timesheets;
    }
    timesheets.push(timesheet);
    return timesheets;
  }, []);

  console.log(timesheetIds);

  useEffect(() => {
    async function fetchData() {
      try {
        await Promise.all([
          dispatch(fetchTimestampsByClub(clubId)),
          dispatch(getCurrentSession(club.byId[club.allIds].session._id))
        ]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [clubId, club]);

  if (!timestamps.allIds.length) return null;
  if (!students.allIds.length) return null;

  return (
    <div className="flex">
      <div>
        {clubPage.students.allIds.map(studentId => (
          <div>{students.byId[studentId].name}</div>
        ))}
      </div>
      <div>
        {timestamps.allIds
          // .filter(timestampId => t)
          .map(timestampId => {
            const timestamp = timestamps.byId[timestampId];
            const student = students.byId[timestamp.student];
            if (!timestamp.pickup) {
              return (
                <div className="flex">
                  <div>{timestamp.datetime}</div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
