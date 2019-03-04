import React, { useState } from 'react';

import styles from './css/NameFilter.module.css';

export default function NameFilter(props) {
  return (
    <form action="">
      <input
        className={styles.search}
        placeholder="search..."
        value={props.query}
        onChange={props.onChange}
        type="text"
      />
      <button className={styles.btn} onClick={props.filterName}>
        Search
      </button>
      {props.currentQuery && <p>Searching for {props.currentQuery}</p>}
    </form>
  );
}
