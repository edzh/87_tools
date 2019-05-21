import React, { useState } from 'react';
import config from 'config';

export default function AddStudent() {
  const name = useFormInput('');
  const grade = useFormInput('');
  const pin = useFormInput('');
  const [alert, setAlert] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${config.apiUrl}/api/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.token}`
      },
      body: JSON.stringify({
        name: name.value,
        grade: grade.value,
        pin: pin.value
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create student!');
        }

        return response.json();
      })
      .then(() =>
        setAlert({
          status: 'Success',
          message: `${name.value} has been created!`
        })
      )
      .catch(err => setAlert({ status: 'Error', message: err.message }));
  }

  return (
    <form
      className="w-1/3 shadow-md border rounded p-4"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4">New Student</h2>
      <div className="mb-4">
        <label className="font-bold text-sm block">Name</label>
        <input
          className="border rounded p-1 w-full shadow block"
          type="text"
          {...name}
        />
      </div>
      <div className="mb-4">
        <label className="font-bold text-sm block">Grade</label>
        <select className="border rounded p-1 w-full shadow block" {...grade}>
          <option value="">---</option>
          <option value="0">Kindergarten</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-bold text-sm block">PIN</label>
        <input
          className="border rounded p-1 w-full shadow block"
          type="number"
          {...pin}
        />
      </div>
      <button
        className="border shadow rounded p-1 bg-blue text-white text-lg hover:bg-grey-lighter hover:text-blue w-full"
        type="submit"
      >
        Submit
      </button>
      {alert && (
        <p
          className={`${
            alert.status === 'Error'
              ? 'border-red-light bg-red-lighter text-red-darker'
              : 'border-green-light bg-green-lighter text-green-darker'
          } p-2 mt-2 border-l-4 rounded`}
        >
          {alert.message}
        </p>
      )}
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
    setValue,
    onChange: handleChange
  };
}
