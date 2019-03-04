import React from 'react';
import ChildrenList from './Children/ChildrenList';
import LibraryListContainer from '../containers/LibraryListContainer';
import GymListContainer from '../containers/GymListContainer';

import students from '../data/87AF_Spring2019_PINNED.json';

import styles from './css/PinLookup.module.css';

export default function PinLookup(props) {
  return (
    <div className={styles.container}>
      {/*<LibraryListContainer />
            <GymListContainer />*/}
      <ChildrenList students={students} />
    </div>
  );
}
