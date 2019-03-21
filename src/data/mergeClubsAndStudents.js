import fetch from 'cross-fetch';
import studentsWithClubs from './87AF_Spring2019_PINNED.json';
import fetchedStudents from './students.json';
import fetchedClubs from './clubs.json';

studentsWithClubs.forEach(studentWithClubs => {
  studentWithClubs.clubs.forEach(club => {
    fetchedClubs.forEach(fetchedClub => {
      if (fetchedClub.name === club.club) {
        fetchedStudents.forEach(fetchedStudent => {
          if (fetchedStudent.name === studentWithClubs.name) {
            const sId = fetchedStudent._id;
            const cId = fetchedClub._id;

            console.log(fetchedStudent.name);
            console.log(sId);
            console.log(cId);

            fetch(`http://10.5.7.5:3001/api/student/${sId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ clubs: cId })
            })
              .then(response => response.json())
              .then(json => console.log('success'))
              .catch(err => console.error('err'));

            // fetch(`http://10.5.7.5:3001/api/club/${cId}`, {
            //   method: 'PUT',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({ students: sId })
            // })
            // .then(response => response.json())
            // .then(json => console.log('success'))
            // .catch(err => console.error('err'))
          }
        });
      }
    });
  });
});

// const getClubs = async (query) => {
//   let clubs
//   try {
//     await fetch(`http://localhost:3001/api/club/`)
//       .then(response => response.json())
//       .then(json => {clubs = json.data})
//       // .catch(err => console.log(err))
//     return clubs
//   } catch (e) {
//     console.error(e)
//   }
// }

// const getStudentByName = async (query) => {
//   let students
//   try {
//     await fetch(`http://localhost:3001/api/student?name=${encodeURIComponent(query)}`,)
//       .then(response => response.json())
//       .then(json => {students = json.data})
//     return students
//   } catch (e) {
//     console.error(e)
//   }
// }

// const updateStudentClubs = async (studentId, clubId) => {
//   try {
//     await fetch(`http://localhost:3001/api/student/${studentId}`, {
//       method: 'PUT',

//     })
//   }
// }

// getStudentByName('Aaron Dreszer').then(student => console.log(student))

// getStudents().then(fetchedStudents => {
//   fetchedStudents.forEach(fetchedStudent => )
// })

// getClubs().then(fetchedClubs => {
//   let clubsArray = []
//   fetchedClubs.forEach(fetchedClub => {
//     students.forEach(student => {
//       student.clubs.forEach(club => {
//         if (club.club === fetchedClub.name) {
//           getStudentByName(student.name).then(student => console.log(student))

//         }
//       })
//     })
//   })
// })

// fetch(`http://localhost:27017/api/student/${}`)
