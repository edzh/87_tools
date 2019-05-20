import React, { useState, useEffect } from 'react';
import { useFormInput } from 'hooks';
import { apiUrl } from 'config';

import SelectClub from './EditStudentClubs';
import EditStudentFamily from './EditStudentFamily';

export default function EditStudentDetails({
  editDetails,
  setEditDetails,
  student
}) {
  const name = useFormInput(student.name);
  const grade = useFormInput(student.grade);
  const pin = useFormInput(student.pin);

  function handleSubmit(e) {
    e.preventDefault();
    editStudent();
  }

  function editStudent() {
    fetch(`${apiUrl}/api/student/${student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        grade: grade.value,
        pin: pin.value
      })
    }).then(() => {
      setEditDetails(!editDetails);
    });
  }

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <label className="w-32 font-bold mb-2 block">Name</label>
      <input className="p-1 border rounded" type="text" {...name} />

      <label className="text-sm w-32 font-bold mt-4 mb-2 block">Grade</label>
      <select className="p-1 border rounded" {...grade}>
        <option value="0">Kindergarten</option>
        <option value="1">1st Grade</option>
        <option value="2">2nd Grade</option>
        <option value="3">3rd Grade</option>
        <option value="4">4th Grade</option>
        <option value="5">5th Grade</option>
      </select>

      <label className="w-32 font-bold mt-4 mb-2 block">PIN</label>
      <input className="p-1 border rounded" type="number" {...pin} />
      <button className="p-2 border rounded mt-4 mb-2 block" type="submit">
        Save
      </button>
    </form>
  );
}
