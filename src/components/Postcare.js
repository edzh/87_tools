import React from 'react';
import ChildContainer from '../containers/ChildContainer';
import LibraryListContainer from '../containers/LibraryListContainer';

import students from '../data/87AF_Spring2019.json';

export default function Postcare(props) {
  return (
    <div>
      <LibraryListContainer />
      {students.map((student, index) => (
        <ChildContainer key={index} student={student} />
      ))}
    </div>
  );
}
