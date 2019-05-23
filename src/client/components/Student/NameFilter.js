import React, { useState } from 'react';

import styles from './css/NameFilter.module.css';

export default function NameFilter(props) {
  return (
    <input
      className="mt-4 p-2 border rounded shadow-inner w-full"
      placeholder="search..."
      value={props.query}
      onChange={props.onChange}
      type="text"
    />
  );
}
