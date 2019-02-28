import React from 'react';

export default function LibraryList(props) {
  return (
    <div>
      {props.library.map((student, index) => (
        <div key={index}>{student.name}</div>
      ))}
    </div>
  );
}
