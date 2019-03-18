import React from 'react';
import { Link } from 'react-router-dom';
import Clubs from './Clubs';

import styles from './css/Student.module.css';

const grades = ['K', '1st', '2nd', '3rd', '4th', '5th'];

export default function Student(props) {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>
        <Link to={`/student/${props.student._id}`}>{props.student.name}</Link>
      </td>
      <td className={styles.pin}>{props.student.pin}</td>
      <td className={styles.grade}>{grades[props.student.grade]}</td>
      <td className={styles.clubs}>
        <Clubs clubs={props.student.clubs} day={props.day} />
      </td>
      {/*<td className={styles.location}>
              <button className={styles.btn} onClick={() => props.addStudentToLibrary(props.student)}>
                Library
              </button>
              <button className={styles.btn} onClick={() => props.addStudentToGym(props.student)}>Gym</button>
            </td>*/}
    </tr>
  );
}
