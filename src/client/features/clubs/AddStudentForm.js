import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentsByProgram } from 'client/actions/studentActions';
import { getClubsBySession } from 'client/actions/clubActions';
import { useDebouncedAutocomplete } from 'utils/hooks';
import { addStudentToClub } from './clubSlice';

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const programId = useSelector(state => state.user.item.currentProgram);
  const students = useSelector(state => state.students.items);
  const clubs = useSelector(state => state.clubs.items);
  const currentClub = useSelector(state => state.clubPageReducer.item);
  const sessionId = currentClub.allIds
    ? currentClub.byId[currentClub.allIds].session._id
    : undefined;

  const { input, suggestions, query } = useDebouncedAutocomplete(
    students.byId,
    students.allIds,
    250
  );

  useEffect(() => {
    programId && dispatch(getStudentsByProgram(programId));
  }, [programId]);

  useEffect(() => {
    sessionId && dispatch(getClubsBySession(sessionId));
  }, [sessionId]);

  function replaceClub(studentId) {
    const studentClubs = students.byId[studentId].clubs;
    const oldClubs = studentClubs
      .filter(clubId => clubs.byId[clubId])
      .filter(
        clubId => clubs.byId[clubId].day !== clubs.byId[currentClub.allIds].day
      );
    const newClubs = [...oldClubs, currentClub.allIds];

    dispatch(
      addStudentToClub({ _id: studentId, clubs: newClubs }, currentClub.allIds)
    );
  }

  return (
    <div>
      {input}
      {suggestions.length !== 0 && (
        <div className="absolute h-64 bg-white overflow-auto">
          {suggestions.map(studentId => (
            <div
              className="px-4 py-2"
              key={studentId}
              onClick={() => replaceClub(studentId)}
            >
              {students.byId[studentId].name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
