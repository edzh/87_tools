import React, { useState } from 'react';
import { apiUrl } from 'config';

export default function AddStudent() {
  const name = useFormInput('');
  const grade = useFormInput('');
  const pin = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${apiUrl}/api/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        grade: grade.value,
        pin: pin.value
      })
    })
      .then(response => response.json())
      .then(json => console.log(json.data))
      .catch(err => console.error(err));
  }

  return (
    <form
      className="w-1/3 shadow-md border rounded p-4"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4">New Student</h2>
      <div className="mb-2">
        <div className="">
          <label className="font-bold text-sm">Name</label>
        </div>
        <div className="">
          <input
            className="border rounded p-1 w-full shadow"
            type="text"
            {...name}
          />
        </div>
      </div>
      <div className="mb-2">
        <div className="">
          <label className="font-bold text-sm">Grade</label>
        </div>
        <div className="">
          <select className="border rounded p-1 w-full shadow" {...grade}>
            <option value="">---</option>
            <option value="0">Kindergarten</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
          </select>
        </div>
      </div>
      <div className="mb-2">
        <div className="">
          <label className="font-bold text-sm">PIN</label>
        </div>
        <div className="">
          <input
            className="border rounded p-1 w-full shadow"
            type="number"
            {...pin}
          />
        </div>
      </div>
      <button
        className="border shadow rounded p-1 bg-blue text-white font-bold text-lg hover:bg-grey-lighter hover:text-blue w-full"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}
