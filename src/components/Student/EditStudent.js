import React, { useState, useEffect } from 'react';
import { useFormInput } from './AddStudent';

import SelectClub from './EditStudentClubs';

export default function EditStudent(props) {
  const { student } = props;

  const name = useFormInput(student.name);
  const grade = useFormInput(student.grade);
  const pin = useFormInput(student.pin);
  const family = useFormInput(student.family ? student.family._id : '');
  const [fetchedClubs, setFetchedClubs] = useState([]);

  const [initialClubs, setInitialClubs] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const studentClubs = student.clubs.reduce(
      (club, line) => {
        club[line.day - 1] = line._id;
        return club;
      },
      ['', '', '', '', '']
    );

    setClubs(studentClubs);
    setInitialClubs(studentClubs);
  }, []);

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
    console.log(clubs.filter(club => club !== ''));
  }, [clubs]);

  function handleSubmit(e) {
    e.preventDefault();

    const diffClubs = initialClubs.filter(club => !clubs.includes(club));
    // .concat(clubs.filter(club => !initialClubs.includes(club)))
    console.log(diffClubs);

    fetch(`http://localhost:3001/api/student/${student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        grade: grade.value,
        pin: pin.value,
        clubs: clubs.filter(club => club !== '')
      })
    })
      .then(response => response.json())
      .then();
  }

  // function handleClubSubmit(e) {
  //   e.preventDefault();

  //   fetch(`http://localhost:3001/api/student${props.student._id}`, {
  //     method: 'PUT',
  //   })
  // }

  function handleClubChange(day, club) {
    const newClub = [...clubs];
    const oldOrNew = [club[day], club];
    newClub[day] = club;

    setClubs(newClub);
    return oldOrNew;
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
              club={club}
              clubsByDay={clubsByDay}
              handleChange={handleClubChange}
            />
          );
        })}
      </form>
    </div>
  );
}
