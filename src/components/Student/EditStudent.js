import React, { useState, useEffect } from 'react';
import { useFormInput } from './AddStudent';
import { apiUrl } from 'config';

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
      const result = await fetch(`${apiUrl}/api/club`)
        .then(response => response.json())
        .then(json => json.data);

      setFetchedClubs(result);
    };

    fetchClubs();
  }, []);

  // useEffect(() => {
  //   console.log(clubs.filter(club => club !== ''));
  // }, [clubs]);

  function handleSubmit(e) {
    e.preventDefault();

    const removeClubs = initialClubs.filter(club => !clubs.includes(club));
    const addClubs = clubs.filter(club => !initialClubs.includes(club));
    // .concat(clubs.filter(club => !initialClubs.includes(club)))
    console.log(removeClubs, addClubs);
    swapStudentFromClubs(student._id, removeClubs, addClubs);

    fetch(`${apiUrl}/api/student/${student._id}`, {
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
    }).then(setInitialClubs(clubs));
  }

  function swapStudentFromClubs(student, oldClubs, newClubs) {
    oldClubs.forEach(async club => {
      const clubStudents = await fetch(`${apiUrl}/api/club/${club}`)
        .then(response => response.json())
        .then(json => json.data.students);

      console.log(
        `${student}`,
        clubStudents
          .map(clubStudent => clubStudent._id)
          .filter(clubStudent => clubStudent !== student)
      );
      fetch(`${apiUrl}/api/club/${club}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          students: clubStudents
            .map(clubStudent => clubStudent._id)
            .filter(clubStudent => clubStudent !== student)
        })
      });
    });

    newClubs.forEach(async club => {
      const clubStudents = await fetch(`${apiUrl}/api/club/${club}`)
        .then(response => response.json())
        .then(json => json.data.students);

      // console.log(clubStudents.map(clubStudent => clubStudent._id).filter(clubStudent => clubStudent === "5c7ebf7e70913a3fec27e94e"))
      console.log(
        clubStudents.map(clubStudent => clubStudent._id).concat(student)
      );
      fetch(`${apiUrl}/api/club/${club}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          students: clubStudents
            ? clubStudents.map(clubStudent => clubStudent._id).concat(student)
            : [student]
        })
      });
    });
  }

  // function handleClubSubmit(e) {
  //   e.preventDefault();

  //   fetch(`http://localhost:3001/api/student${props.student._id}`, {
  //     method: 'PUT',
  //   })
  // }

  function handleClubChange(day, club) {
    const newClub = [...clubs];
    newClub[day] = club;
    setClubs(newClub);
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
