import React, { useEffect } from 'react';

import styles from './css/ManualEntry.module.css';

export default function ManualEntry(props) {
  useEffect(() => {
    props.fetchStudents();
  }, []);

  const handleInput = student => {
    props
      .postTimestamp(student)
      .then(() => props.setError(''))
      .catch(err => props.setError(err.message));
  };

  return (
    <div className={styles.container}>
      <h2>Manual Entry</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((student, index) => (
            <tr key={index}>
              <td className={styles.name}>{student.name}</td>
              <td>
                <button
                  className={styles.btn}
                  onClick={() => handleInput(student)}
                >
                  Sign In
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
