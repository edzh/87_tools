import React from 'react';

import styles from './css/DayFilter.module.css';

export default function DayList(props) {
  return [
    <button className={styles.btn} value="all" onClick={props.onDayChange}>
      All
    </button>,
    <button className={styles.btn} value="1" onClick={props.onDayChange}>
      Monday
    </button>,
    <button className={styles.btn} value="2" onClick={props.onDayChange}>
      Tuesday
    </button>,
    <button className={styles.btn} value="3" onClick={props.onDayChange}>
      Wednesday
    </button>,
    <button className={styles.btn} value="4" onClick={props.onDayChange}>
      Thursday
    </button>,
    <button className={styles.btn} value="5" onClick={props.onDayChange}>
      Friday
    </button>
  ];
}
