import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { format } from 'date-fns';

export default function Timesheet() {
  const io = useFormInput('');
  const [toTimesheets, setToTimesheets] = useState(false);
  const date = useFormInput(format(new Date(), 'YYYY-MM-DD'));

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
    }).then(() => {
      setToTimesheets(true);
    });
  }

  if (toTimesheets === true) {
    return <Redirect to="/timesheet" />;
  }

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
