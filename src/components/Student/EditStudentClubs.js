import React, { useState, useEffect } from 'react';

export default function EditStudentClubs(props) {
  function handleChange(e) {
    props.handleChange(props.day - 1, e.target.value);
  }

  return (
    <select
      className="p-2 m-2 border rounded block"
      value={props.club}
      onChange={handleChange}
    >
      <option value="">---</option>
      {props.clubsByDay
        .filter(club => club.day === props.day)
        .map((club, index) => (
          <option key={club._id} value={club._id}>
            {club.name}
          </option>
        ))}
    </select>
  );
}
