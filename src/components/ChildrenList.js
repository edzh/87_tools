import React, { useState, useEffect } from 'react';
import ChildContainer from '../containers/ChildContainer';

export default function ChildrenList(props) {
  const [query, setQuery] = useState('');
  const [regex, setRegex] = useState();
  const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;

  useEffect(() => {
    setRegex(new RegExp(query.replace(invalid, ''), 'gi'));
  }, [query]);

  function onChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <input
        placeholder="search..."
        value={query}
        onChange={onChange}
        type="text"
      />
      {props.students
        .filter(student => student.grade)
        .filter(student => student.name.match(regex))
        .map((student, index) => (
          <ChildContainer key={index} student={student} />
        ))}
    </div>
  );
}
