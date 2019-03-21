import React, { useState, useEffect } from 'react';

export default function EditStudentClubs(props) {
  return (
    <select
      value={props.club}
      onChange={e => props.handleChange(props.day - 1, e.target.value)}
    >
      <option value="">---</option>
      {props.clubsByDay
        .filter(club => club.day === props.day)
        .map((club, index) => (
          <option key={index} value={club._id}>
            {club.name}
          </option>
        ))}
    </select>
  );
}
