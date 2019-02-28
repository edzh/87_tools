import React from 'react';
import Child from './Child';

import students from '../data/87AF_Spring2019.json';

export default function Postcare(props) {
  return (
    <div>
      {students.map((student, index) => (
        <Child key={index} student={student} />
      ))}
    </div>
  );
}
