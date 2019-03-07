import React, { useState, useEffect } from 'react';

import styles from './css/Student.module.css';

import StudentContainer from '../../containers/StudentContainer';
import DayFilter from './DayFilter';
import NameFilter from './NameFilter';
import LetterFilter from './LetterFilter';

export default function Student(props) {
  const [query, setQuery] = useState('');
  const [regex, setRegex] = useState();
  const [currentQuery, setCurrentQuery] = useState('');
  const [day, setDay] = useState('all');
  const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;

  function onChange(e) {
    setQuery(e.target.value);
  }

  function filterName(e) {
    e.preventDefault();
    setCurrentQuery(query);
    setRegex(new RegExp(query.replace(invalid, ''), 'gi'));
  }

  function filterLetter(e) {
    e.preventDefault();
    setCurrentQuery(e.target.value);
    setRegex(new RegExp(`^${e.target.value}`, 'gi'));
  }

  function onDayChange(e) {
    setDay(e.target.value);
  }

  if (props.isFetching && props.students === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <DayFilter onDayChange={onDayChange} />
      <NameFilter
        filterName={filterName}
        currentQuery={currentQuery}
        query={query}
        onChange={onChange}
      />
      <LetterFilter filterLetter={filterLetter} />
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Name</th>
            <th>PIN</th>
            <th>Grade</th>
            <th>Clubs</th>
            {/*<th>Location</th>*/}
          </tr>
        </thead>
        <tbody>
          {props.students
            // .filter(student => student.grade)
            .filter(student => {
              let condition;

              if (day === 'all') {
                return true;
              }

              student.clubs.forEach(club => {
                if (`${club.day}` === day) {
                  condition = true;
                }
              });

              return condition;
            })
            .filter(student => student.name.match(regex))
            .sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();

              if (nameA < nameB) {
                return -1;
              }

              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })
            .map((student, index) => {
              return (
                <StudentContainer key={index} student={student} day={day} />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
