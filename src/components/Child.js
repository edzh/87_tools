import React from 'react';
import Clubs from './Clubs';

export default function Child(props) {
  return (
    <div>
      <h4>{props.student.name}</h4>
      <p>{props.student.grade}</p>
      <Clubs clubs={props.student.clubs} />
    </div>
  );
}
