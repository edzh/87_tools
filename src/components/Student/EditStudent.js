import React, { useState, useEffect } from 'react';
import { useFormInput } from './AddStudent';

import SelectClub from './EditStudentClubs';

export default function EditStudent(props) {
  const name = useFormInput(props.student.name);
  const grade = useFormInput(props.student.grade);
  const pin = useFormInput(props.student.pin);
  const family = useFormInput(props.student.family._id);
  const [fetchedClubs, setFetchedClubs] = useState([]);
  const clubs = [
    useFormInput(
      props.student.clubs.filter(club => club.day === 1)[0]
        ? props.student.clubs.filter(club => club.day === 1)[0]._id
        : ''
    ),
    useFormInput(
      props.student.clubs.filter(club => club.day === 2)[0]
        ? props.student.clubs.filter(club => club.day === 2)[0]._id
        : ''
    ),
    useFormInput(
      props.student.clubs.filter(club => club.day === 3)[0]
        ? props.student.clubs.filter(club => club.day === 3)[0]._id
        : ''
    ),
    useFormInput(
      props.student.clubs.filter(club => club.day === 4)[0]
        ? props.student.clubs.filter(club => club.day === 4)[0]._id
        : ''
    ),
    useFormInput(
      props.student.clubs.filter(club => club.day === 5)[0]
        ? props.student.clubs.filter(club => club.day === 5)[0]._id
        : ''
    )
  ];

  useEffect(() => {
    const fetchClubs = async () => {
      const result = await fetch(`http://localhost:3001/api/club`)
        .then(response => response.json())
        .then(json => json.data);

      setFetchedClubs(result);
    };

    fetchClubs();
  }, []);

  useEffect(() => {
    console.log(clubs);
  }, [clubs]);

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
    <div>
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
      <form>
        {clubs.map((club, index) => {
          const day = index + 1;
          const clubsByDay = fetchedClubs.filter(
            fetchedClub => fetchedClub.day === day
          );
          return (
            <SelectClub
              key={index}
              day={day}
              club={club.value}
              clubs={clubsByDay}
              handleChange={club.onChange}
            />
          );
        })}
      </form>
    </div>
  );
}
