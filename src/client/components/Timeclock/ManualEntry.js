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
    props.postTimestamp(student, fobStatus).catch(err => props.setMessage(err));
  };

  return (
    <div className="border rounded shadow-md pt-4 mt-4">
      <div className="border-b shadow">
        <h2 className="py-1 pl-2">Manual Entry</h2>
        <NameFilter
          filterName={filterName}
          currentQuery={currentQuery}
          query={query}
          onChange={onChange}
        />
      </div>
      <table className="overflow-auto w-full block">
        <thead>
          <tr>
            <th className="py-1 pl-2">Name</th>
          </tr>
        </thead>
        <tbody className="block" style={{ height: '390px' }}>
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
              <tr key={student._id} className="border-b block w-full flex">
                <td className="pl-2 py-1 w-3/4">{student.name}</td>
                <td className="flex">
                  <button
                    className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
                    onClick={() => handleInput(student, 'Lost')}
                  >
                    Lost
                  </button>
                  <button
                    className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
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
