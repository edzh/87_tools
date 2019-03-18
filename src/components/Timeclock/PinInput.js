import React, { useState } from 'react';

import TimeclockError from './TimeclockError';
import StudentSelector from './StudentSelector';

import styles from './css/PinInput.module.css';

export default function PinInput(props) {
  const { error, family, handleFamily, handleSubmit, pin, setPin } = props;

  function handleChange(e) {
    setPin(e.target.value);
  }

  return (
    <div className={styles.input}>
      <h2>Timeclock</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.pin}
          placeholder="PIN"
          type="number"
          autoFocus={true}
          value={pin}
          onChange={handleChange}
        />
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
      <TimeclockError error={error} />
      <StudentSelector family={family} handleFamily={handleFamily} />
    </div>
  );
}
