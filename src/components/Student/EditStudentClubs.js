import React, { useState, useEffect } from 'react';

export default function EditStudentClubs(props) {
  const [selectedClub, setSelectedClub] = useState('');
  useEffect(() => {
    console.log(props.club);
    if (props.club) {
      setSelectedClub(props.club);
    }
  }, []);

  function handleChange(e) {
    setSelectedClub(e.target.value);
  }

  return (
    <select value={selectedClub} onChange={props.handleChange}>
      <option value="">---</option>
      {props.clubs
        .filter(club => club.day === props.day)
        .map((club, index) => (
          <option key={index} value={club._id}>
            {club.name}
          </option>
        ))}
    </select>
  );
}
