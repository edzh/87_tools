import React, { useState, useRef, useEffect } from 'react';

import Alert from '../Alert';
import StudentSelector from './StudentSelector';

export default function PinInput({
  message,
  family,
  handleFamily,
  handleSubmit,
  pin,
  setPin,
  refresh
}) {
  const inputRef = useRef();

  function handleChange(e) {
    setPin(e.target.value);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [refresh]);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="mb-4 font-normal">Timeclock</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border shadow-inner block p-4 text-xl rounded-t w-full"
          placeholder="PIN"
          type="number"
          autoFocus={true}
          value={pin}
          onChange={handleChange}
          ref={inputRef}
        />
        <button
          className="p-2 border hover:border-blue hover:bg-blue hover:text-white shadow text-blue bg-grey-lightest border-grey-light text-xl rounded-b w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Alert message={message} />
      <StudentSelector family={family} handleFamily={handleFamily} />
    </div>
  );
}
