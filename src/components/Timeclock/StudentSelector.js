import React from 'react';

export default function StudentSelector(props) {
  return (
    <div>
      {props.family.map((student, index) => (
        <input
          type="checkbox"
          key={index}
          onClick={() => props.handleFamily(student)}
        >
          {student.name}
        </input>
      ))}
    </div>
  );
}
