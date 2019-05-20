import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';

const intToDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function EditStudentClubs({ student, editClubs, setEditClubs }) {
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

  function handleSubmit(e) {
    e.preventDefault();
    editStudent();
  }

  function editStudent() {
    const removeClubs = initialClubs.filter(club => !clubs.includes(club));
    const addClubs = clubs.filter(club => !initialClubs.includes(club));

    swapStudentFromClubs(student._id, removeClubs, addClubs);

    fetch(`${apiUrl}/api/student/${student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clubs: clubs.filter(club => club !== '')
      })
    }).then(() => setEditClubs(!editClubs));
  }

  function swapStudentFromClubs(student, oldClubs, newClubs) {
    oldClubs.forEach(async club => {
      const clubStudents = await fetch(`${apiUrl}/api/club/${club}`)
        .then(response => response.json())
        .then(json => json.data.students);

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

  function handleClubChange(day, club) {
    const newClub = [...clubs];
    newClub[day] = club;
    setClubs(newClub);
  }

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      {clubs.map((club, index) => {
        const day = index + 1;
        const clubsByDay = fetchedClubs.filter(
          fetchedClub => fetchedClub.day === day
        );
        return (
          <div className="flex m-2">
            <h3 className="w-32">{intToDay[day]}</h3>
            <select
              className="border rounded block"
              value={club}
              onChange={e => handleClubChange(index, e.target.value)}
            >
              <option value="">---</option>
              {clubsByDay
                .filter(clubByDay => clubByDay.day === day)
                .map((clubByDay, index) => (
                  <option key={clubByDay._id} value={clubByDay._id}>
                    {clubByDay.name}
                  </option>
                ))}
            </select>
          </div>
        );
      })}
      <button className="p-2 border rounded" type="submit">
        Save
      </button>
    </form>
  );
}
