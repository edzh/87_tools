import React, { useState, useEffect } from 'react';
import ChildContainer from '../containers/ChildContainer';

export default function ChildrenList(props) {
  const [query, setQuery] = useState('');
  const [regex, setRegex] = useState();
  const [day, setDay] = useState('all');
  const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;

  useEffect(() => {
    setRegex(new RegExp(query.replace(invalid, ''), 'gi'));
  }, [query]);

  function onChange(e) {
    setQuery(e.target.value);
  }

  function onDayChange(e) {
    setDay(e.target.value);
  }

  return (
    <div>
      <input
        placeholder="search..."
        value={query}
        onChange={onChange}
        type="text"
      />
      <button value="all" onClick={onDayChange}>
        All
      </button>
      <button value="1" onClick={onDayChange}>
        Monday
      </button>
      <button value="2" onClick={onDayChange}>
        Tuesday
      </button>
      <button value="3" onClick={onDayChange}>
        Wednesday
      </button>
      <button value="4" onClick={onDayChange}>
        Thursday
      </button>
      <button value="5" onClick={onDayChange}>
        Friday
      </button>
      {props.students
        .filter(student => student.grade)
        .filter(student => {
          let condition;
          if (day === 'all') {
            return true;
          }
          student.clubs.forEach(club => {
            if (club.day === day) {
              condition = true;
            }
          });
          // console.log(student.name, student.clubs, condition)
          return condition;
        })
        .filter(student => student.name.match(regex))
        .map((student, index) => (
          <ChildContainer key={index} student={student} />
        ))}
    </div>
  );
}
