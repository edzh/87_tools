import React, { useState } from 'react';

import TimeclockMessage from './TimeclockMessage';
import StudentSelector from './StudentSelector';

export default function PinInput(props) {
  const { message, family, handleFamily, handleSubmit, pin, setPin } = props;

  function handleChange(e) {
    setPin(e.target.value);
  }

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="mb-4">Timeclock</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border shadow-inner block p-4 text-xl rounded-t w-full"
          placeholder="PIN"
          type="number"
          autoFocus={true}
          value={pin}
          onChange={handleChange}
        />
        <button
          className="p-2 border hover:border-blue hover:bg-blue hover:text-white shadow text-blue bg-grey-lightest border-grey-light text-xl rounded-b w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
      <TimeclockMessage message={message} />
      <StudentSelector family={family} handleFamily={handleFamily} />
    </div>
  );
}
