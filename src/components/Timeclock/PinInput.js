import React, { useState } from 'react';

import TimeclockError from './TimeclockError';
import StudentSelector from './StudentSelector';

export default function PinInput(props) {
  const { error, family, handleFamily, handleSubmit, pin, setPin } = props;

  function handleChange(e) {
    setPin(e.target.value);
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="mb-4">Timeclock</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-grey-lighter p-4 rounded-l"
          placeholder="PIN"
          type="number"
          autoFocus={true}
          value={pin}
          onChange={handleChange}
        />
        <button className="bg-grey-light p-4 rounded-r" type="submit">
          Submit
        </button>
      </form>
      <TimeclockError error={error} />
      <StudentSelector family={family} handleFamily={handleFamily} />
    </div>
  );
}
