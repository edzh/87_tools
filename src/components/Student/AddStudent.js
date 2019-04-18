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
    <form className="w-1/3 border rounded m-2 p-2" onSubmit={handleSubmit}>
      <h2 className="mb-4">New Student</h2>
      <div className="flex mb-2">
        <div className="w-1/4">
          <label className="block pr-4 text-right">Name:</label>
        </div>
        <div className="w-3/4">
          <input className="border rounded p-1" type="text" {...name} />
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/4">
          <label className="block pr-4 text-right">Grade:</label>
        </div>
        <div className="w-3/4">
          <select className="border rounded p-1" {...grade}>
            <option value="0">K</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/4">
          <label className="block pr-4 text-right">PIN:</label>
        </div>
        <div className="w-3/4">
          <input className="border rounded p-1" type="number" {...pin} />
        </div>
      </div>
      <button
        className="border rounded p-1 hover:bg-grey-lighter mx-auto w-3/4"
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
