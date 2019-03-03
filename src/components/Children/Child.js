import React from 'react';
import Clubs from './Clubs';

export default function Child(props) {
  return (
    <tr>
      <td>
        <h4>{props.student.name}</h4>
      </td>
      <td>{props.student.pin}</td>
      <td>{props.student.grade}</td>
      <td>
        <Clubs clubs={props.student.clubs} day={props.day} />
      </td>
      <td>
        <button onClick={() => props.addChildToLibrary(props.student)}>
          Library
        </button>
      </td>
      <td>
        <button onClick={() => props.addChildToGym(props.student)}>Gym</button>
      </td>
    </tr>
  );
}
