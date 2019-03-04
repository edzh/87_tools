import React from 'react';
import Clubs from './Clubs';

import styles from './css/Child.module.css';

export default function Child(props) {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>{props.student.name}</td>
      <td className={styles.pin}>{props.student.pin}</td>
      <td className={styles.grade}>{props.student.grade}</td>
      <td className={styles.clubs}>
        <Clubs clubs={props.student.clubs} day={props.day} />
      </td>
      {/*<td className={styles.location}>
              <button className={styles.btn} onClick={() => props.addChildToLibrary(props.student)}>
                Library
              </button>
              <button className={styles.btn} onClick={() => props.addChildToGym(props.student)}>Gym</button>
            </td>*/}
    </tr>
  );
}
