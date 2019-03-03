import React from 'react';
import ChildrenList from './Children/ChildrenList';
import LibraryListContainer from '../containers/LibraryListContainer';
import GymListContainer from '../containers/GymListContainer';

import students from '../data/87AF_Spring2019_PINNED.json';

export default function Postcare(props) {
  return (
    <div>
      <LibraryListContainer />
      <GymListContainer />
      <ChildrenList students={students} />
    </div>
  );
}
