import React from 'react';
import { useFormInput } from './AddStudent';

export default function EditStudent(props) {
  const name = useFormInput(props.student.name);
  const grade = useFormInput(props.student.grade);
  const pin = useFormInput(props.student.pin);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3001/api/student/${props.student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        grade: grade.value,
        pin: pin.value
      })
    });
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
      <button type="submit">Save</button>
    </form>
  );
}
