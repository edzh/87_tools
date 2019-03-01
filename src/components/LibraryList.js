import React from 'react';

export default function LibraryList(props) {
  return (
    <div>
      <h3>Library</h3>
      {props.library.map((student, index) => (
        <div key={index} onClick={() => props.removeChildFromLibrary(student)}>
          {student.present ? (
            <p>{student.name}</p>
          ) : (
            <p>
              <strike>{student.name}</strike>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
