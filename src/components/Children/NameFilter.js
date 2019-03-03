import React from 'react';

export default function NameFilter(props) {
  return (
    <form action="">
      <input
        placeholder="search..."
        value={props.query}
        onChange={props.onChange}
        type="text"
      />
      <button onClick={props.filterName}>Search</button>
    </form>
  );
}
