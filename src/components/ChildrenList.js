import React, { useState, useEffect } from 'react';
import ChildContainer from '../containers/ChildContainer';

export default function ChildrenList(props) {
  const [query, setQuery] = useState('');

  function onChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <input value={query} onChange={onChange} type="text" />
      {props.students
        .filter(student => student.name.match(new RegExp(query, 'gi')))
        .map((student, index) => (
          <ChildContainer key={index} student={student} />
        ))}
    </div>
  );
}
