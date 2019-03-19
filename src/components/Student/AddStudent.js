import React, { useState } from 'react';

export default function AddStudent() {
  const name = useFormInput('');
  const grade = useFormInput('');
  const pin = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:3001/api/student', {
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
    <form onSubmit={handleSubmit}>
      <input type="text" {...name} />
      <select {...grade}>
        <option value="0">K</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input type="number" {...pin} />
      <button type="submit">Submit</button>
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
