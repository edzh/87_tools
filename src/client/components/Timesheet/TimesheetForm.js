import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { format } from 'date-fns';

export default function Timesheet() {
  const io = useFormInput('');
  const [toTimesheets, setToTimesheets] = useState(false);
  const date = useFormInput(format(new Date(), 'YYYY-MM-DD'));

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/api/timesheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({
        io: io.value,
        date: `${date.value}T04:00:00.000Z`
      })
    }).then(() => {
      setToTimesheets(true);
    });
  }

  if (toTimesheets === true) {
    return <Redirect to="/timesheet" />;
  }

  return (
    <form className="w-1/3 border rounded m-2 p-2" onSubmit={handleSubmit}>
      <h2 className="mb-4">New Timesheet</h2>
      <div className="flex mb-2">
        <div className="w-1/5">
          <label className="block pr-4 text-right">Date:</label>
        </div>
        <div className="w-3/4">
          <input className="p-1 border rounded" type="date" {...date} />
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/5">
          <label className="block pr-4 text-right">Type:</label>
        </div>
        <div className="w-3/4">
          <select className="p-1 border rounded" {...io}>
            <option value="">---</option>
            <option value="in">Sign in</option>
            <option value="out">Sign out</option>
          </select>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/5" />
        <div className="w-3/4">
          <button
            className="p-2 border rounded hover:bg-blue-light hover:text-white"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
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
