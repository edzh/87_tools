import React from 'react';

export default function LibraryList(props) {
  return (
    <div>
      <h3>Library</h3>
      {props.library.map((student, index) => (
        <div
          key={index}
          onClick={() => props.removeStudentFromLibrary(student)}
        >
          {student.present ? (
            <p>
              {student.name} {student.pin}
            </p>
          ) : (
            <p>
              <strike>{student.name}</strike> {student.pin}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
