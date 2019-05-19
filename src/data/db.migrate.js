import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';

export default props => {
  const [fetchedStudents, setFetchedStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      const students = await fetch(`${apiUrl}/api/student`)
        .then(response => response.json())
        .then(json => json.data);

      setFetchedStudents(students);
    };

    fetchStudents();
  }, []);

  function reducePins() {
    const studentPin = fetchedStudents.reduce((students, student) => {
      return [...students, { id: student._id, pin: student.pin }];
    }, []);

    return studentPin;
  }

  function migrateStudentPins() {
    reducePins().forEach(studentPin => {
      const fetchStudent = async () => {
        const student = await fetch(`${apiUrl}/api/student/${studentPin.id}`)
          .then(response => response.json())
          .then(json => console.log(json.data));
      };

      const postPin = async () => {
        const pin = await fetch(`${apiUrl}/api/pin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pin: studentPin.pin,
            on: studentPin.id,
            onModel: 'student'
          })
        })
          .then(response => response.json())
          .then(json => updatePin(json.data));

        const updatePin = async data => {
          fetch(`${apiUrl}/api/student/${studentPin.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pin: data._id })
          });
        };
      };

      fetchStudent();
    });
    // reducePins().forEach(student => console.log(student))
  }

  return (
    <button
      type="button"
      className="block mx-auto p-8 bg-blue-dark rounded text-5xl shadow-lg text-blue-lightest hover:bg-blue-lighter hover:text-blue-dark border-4 border-blue-dark"
      style={{ transition: 'all 125ms ease' }}
      onClick={() => migrateStudentPins()}
    >
      Migrate Students
    </button>
  );
};
