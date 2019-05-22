import React from 'react';

import styles from './css/DayFilter.module.css';

export default function DayList(props) {
  return [
    <button
      key="0"
      className={styles.btn}
      value="all"
      onClick={props.onDayChange}
    >
      All
    </button>,
    <button
      key="1"
      className={styles.btn}
      value="1"
      onClick={props.onDayChange}
    >
      Monday
    </button>,
    <button
      key="2"
      className={styles.btn}
      value="2"
      onClick={props.onDayChange}
    >
      Tuesday
    </button>,
    <button
      key="3"
      className={styles.btn}
      value="3"
      onClick={props.onDayChange}
    >
      Wednesday
    </button>,
    <button
      key="4"
      className={styles.btn}
      value="4"
      onClick={props.onDayChange}
    >
      Thursday
    </button>,
    <button
      key="5"
      className={styles.btn}
      value="5"
      onClick={props.onDayChange}
    >
      Friday
    </button>
  ];
}
