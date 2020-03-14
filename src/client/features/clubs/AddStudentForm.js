import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentsByProgram } from 'client/actions/studentActions';
import { getClubsBySession } from 'client/actions/clubActions';
import { getSessionsByProgram } from 'client/actions/sessionActions';
import { useDebouncedAutocomplete } from 'utils/hooks';
import { addStudentToClub } from './clubSlice';
import { intToDay } from 'utils/constants';

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const programId = useSelector(state => state.user.item.currentProgram);
  const students = useSelector(state => state.students.items);
  const clubs = useSelector(state => state.clubs.items);
  const currentClub = useSelector(state => state.clubPage.item);
  const sessions = useSelector(state => state.sessions.items);
  const sessionId = currentClub.allIds
    ? currentClub.byId[currentClub.allIds].session._id
    : undefined;

  const { suggestions, query } = useDebouncedAutocomplete(students, 200);

  let oldClubId;

  useEffect(() => {
    if (programId) {
      dispatch(getSessionsByProgram(programId));
    }
  }, [programId]);

  useEffect(() => {
    sessionId && dispatch(getClubsBySession(sessionId));
  }, [sessionId]);

  function replaceClub(studentId) {
    const studentClubs = students.byId[studentId].clubs;
    const oldClubs = studentClubs.filter(clubId => {
      if (clubs.byId[clubId]) {
        return clubs.byId[clubId].day !== clubs.byId[currentClub.allIds].day;
      }
      return true;
    });
    const newClubs = [...oldClubs, currentClub.allIds];

    dispatch(
      addStudentToClub({ _id: studentId, clubs: newClubs }, currentClub.allIds)
    );
    query.set('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    replaceClub(suggestions[0]);
  }
  return (
    <div className="m-2">
      <form onSubmit={handleSubmit}>
        <input
          className="mb-0 p-2 rounded-l border border-gray-400"
          type="text"
          onChange={e => query.set(e.target.value)}
          value={query.get}
        />
        <button className="bg-blue-500 hover:bg-blue-400 rounded-r p-2 text-white border border-blue-500">
          Add Student
        </button>
      </form>
      {suggestions.length !== 0 && (
        <div
          className="absolute bg-white overflow-auto shadow rounded-b border border-gray-400"
          style={{ maxHeight: '16rem', minWidth: '12rem' }}
        >
          {suggestions.map((studentId, index) => (
            <div
              className="px-2 py-1 border border-b border-gray-200 text-sm hover:bg-gray-200 cursor-pointer"
              key={studentId}
              onClick={() => replaceClub(studentId)}
            >
              {students.byId[studentId].name}
            </div>
          ))}
        </div>
      )}
      {sessions.allIds.length !== 0 && clubs.allIds.length !== 0 && (
        <p className="text-xs">
          * Adding students to this club will remove them from other{' '}
          {intToDay[clubs.byId[currentClub.allIds].day]} clubs in the{' '}
          {sessions.byId[sessionId].name} session.{' '}
        </p>
      )}
    </div>
  );
}
