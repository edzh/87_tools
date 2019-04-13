import React, { useState, useEffect } from 'react';

import styles from './css/ManualEntry.module.css';
import NameFilter from '../Student/NameFilter';

export default function ManualEntry(props) {
  const [query, setQuery] = useState('');
  const [regex, setRegex] = useState();
  const [currentQuery, setCurrentQuery] = useState('');
  const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;

  useEffect(() => {
    props.fetchStudents();
  }, []);

  function onChange(e) {
    setQuery(e.target.value);
  }

  function filterName(e) {
    e.preventDefault();
    setCurrentQuery(query);
    setRegex(new RegExp(query.replace(invalid, ''), 'gi'));
  }

  const handleInput = (student, fobStatus) => {
    props
      .postTimestamp(student, fobStatus)
      .then(() => props.setError(''))
      .catch(err => props.setError(err.message));
  };

  return (
    <div className={styles.container}>
      <h2>Manual Entry</h2>
      <NameFilter
        filterName={filterName}
        currentQuery={currentQuery}
        query={query}
        onChange={onChange}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.students
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
            .map((student, index) => (
              <tr key={index}>
                <td className={styles.name}>{student.name}</td>
                <td>
                  <button
                    className={styles.btn}
                    onClick={() => handleInput(student, 'Lost')}
                  >
                    Lost
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleInput(student, 'Damaged')}
                  >
                    Damaged
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
