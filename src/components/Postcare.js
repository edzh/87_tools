import React from 'react';
import ChildrenList from './ChildrenList';
import LibraryListContainer from '../containers/LibraryListContainer';

import students from '../data/87AF_Spring2019.json';

export default function Postcare(props) {
  return (
    <div>
      <LibraryListContainer />
      <ChildrenList students={students} />
    </div>
  );
}
