import React from 'react';

export default function ClubStudentList(props) {
  return (
    <ul>
      {props.club.students.map(student => (
        <li>{student.name}</li>
      ))}
    </ul>
  );
}
