import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Student(props) {
  return (
    <ul>
      {props.students.items &&
        props.students.items.map((student, index) => (
          <li key={student._id}>
            <Link to={`/student/${student._id}`}>{student.name}</Link>
          </li>
        ))}
    </ul>
  );
}
