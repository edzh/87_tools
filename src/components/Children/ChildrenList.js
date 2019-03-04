import React, { useState, useEffect } from 'react';

import styles from './css/ChildrenList.module.css';

import ChildContainer from '../../containers/ChildContainer';
import DayFilter from './DayFilter';
import NameFilter from './NameFilter';

export default function ChildrenList(props) {
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

  function onDayChange(e) {
    setDay(e.target.value);
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
              return condition;
            })
            .filter(student => student.name.match(regex))
            .map((student, index) => (
              <ChildContainer key={index} student={student} day={day} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
