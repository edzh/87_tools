import React, { useState } from 'react';

import styles from './css/NameFilter.module.css';

export default function NameFilter(props) {
  return (
    <form className="py-2 pl-2">
      <input
        className="p-2 border rounded-l"
        placeholder="search..."
        value={props.query}
        onChange={props.onChange}
        type="text"
      />
      <button
        className="p-2 rounded-r border hover:bg-grey-light bg-grey-lighter"
        onClick={props.filterName}
      >
        Search
      </button>
      {props.currentQuery && (
        <button value="" onClick={props.onChange}>
          Clear
        </button>
      )}
      {props.currentQuery && <p>Searching for {props.currentQuery}</p>}
    </form>
  );
}
