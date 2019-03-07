import React, { useState } from 'react';

export default function Timesheet() {
  const io = useFormInput('');
  const date = useFormInput(Date.now());

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:3001/api/timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        io: io.value,
        date: date.value
      })
    });
  }
  console.log(date);
  return (
    <form onSubmit={handleSubmit}>
      <input type="date" {...date} />
      <select {...io}>
        <option value="">---</option>
        <option value="in">Sign in</option>
        <option value="out">Sign out</option>
      </select>
      <button type="submit">New Timesheet</button>
    </form>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}
