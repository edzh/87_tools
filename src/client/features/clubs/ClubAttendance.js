import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { fetchTimestampsByClub } from './clubSlice';
import { getCurrentSession } from 'client/actions/sessionActions';

export default function ClubAttendance({ match }) {
  const dispatch = useDispatch();
  const clubId = match.params.id;
  const timestamps = useSelector(state => state.clubPage.timestamps);
  const students = useSelector(state => state.students.items);
  const clubPage = useSelector(state => state.clubPage);
  const club = clubPage.item;
  const session = useSelector(state => state.currentSession.item);

  useEffect(() => {
    // console.log(club.byId[club.allIds])
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
          // .reduce(())
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
