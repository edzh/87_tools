import React from 'react';

export default function PickStudent(props) {
  return (
    <div>
      {props.family.map((student, index) => (
        <button key={index} onClick={() => props.handleFamily(student)}>
          {student.name}
        </button>
      ))}
    </div>
  );
}
