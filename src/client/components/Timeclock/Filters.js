import React from 'react';

import FilterLink from '../../containers/Timeclock/FilterLink';

export default function Filters(props) {
  return (
    <div>
      <FilterLink filter={'SHOW_ALL'}>All</FilterLink>
      <FilterLink filter={'SHOW_LOST'}>Lost</FilterLink>
      <FilterLink filter={'SHOW_DAMAGED'}>Damaged</FilterLink>
    </div>
  );
}
