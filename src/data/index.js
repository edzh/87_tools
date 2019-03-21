import fetch from 'cross-fetch';
import students from './87AF_Spring2019_PINNED.json';

const ip = '10.5.7.5';

const grades = {
  K: 0,
  '1st': 1,
  '2nd': 2,
  '3rd': 3,
  '4th': 4,
  '5th': 5
};

const postStudent = (name, grade, pin) => {
  fetch(`http://${ip}:3001/api/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, grade: grades[grade], pin })
  })
    .then(response => response.json())
    .then(json => console.log('Success'))
    .catch(err => console.error(err));
};

/*
 *  Uncomment to import students to database
 */

// students.forEach(student => {
//   postStudent(student.name, student.grade, student.pin)
// })

const stuff = {};

const studentClubs = students.map(student => {
  return student.clubs;
});

const clubsOnly = studentClubs.forEach(clubs => {
  clubs.forEach(club => {
    stuff[club.club] = { day: club.day };
  });
});

const clubImport = Object.keys(stuff).map(key => ({
  name: key,
  day: stuff[key].day
}));

// console.log(clubImport)

const postClub = (name, day) => {
  fetch(`http://${ip}:3001/api/club`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, day })
  })
    .then(response => response.json())
    .then(json => console.log('Success'))
    .catch(err => console.error(err));
};

/*
 *  Uncomment to import clubs to database
 */

// clubImport.forEach(club => {
//   postClub(club.name, club.day)
// })

// const fetchedClubs = getClubId().then(clubs => clubs.forEach((club) => console.log(club.name)))
