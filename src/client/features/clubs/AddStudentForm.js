import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentsByProgram } from 'client/actions/studentActions';
import { useDebouncedAutocomplete } from 'utils/hooks';

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const programId = useSelector(state => state.user.item.currentProgram);
  const students = useSelector(state => state.students.items);

  const { input, suggestions, query } = useDebouncedAutocomplete(
    students.byId,
    students.allIds,
    250
  );

  useEffect(() => {
    programId && dispatch(getStudentsByProgram(programId));
  }, [programId]);

  return (
    <div>
      {input}
      {suggestions.length !== 0 && (
        <div className="absolute h-64 bg-white overflow-auto">
          {suggestions.map(studentId => (
            <div className="px-4 py-2" key={studentId}>
              {students.byId[studentId].name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
