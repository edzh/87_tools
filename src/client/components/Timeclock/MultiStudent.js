import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function MultiStudent({
  multiStudent,
  addTimestamp,
  currentTimesheet,
  setMultiStudent,
  pinInputRef,
  signInTimestamps
}) {
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    setSelectedStudents(
      multiStudent.students.reduce((selected, student) => {
        const signedIn = signInTimestamps.find(
          timestamp => timestamp.student._id === student._id
        );

        console.log(signedIn);

        if (signedIn) {
          selected.push({
            _id: student._id,
            name: student.name,
            currentClubs: student.currentClubs,
            selected: true
          });
        } else {
          selected.push({
            _id: student._id,
            name: student.name,
            currentClubs: student.currentClubs,
            selected: false
          });
        }

        return selected;
      }, [])
    );
  }, [multiStudent]);

  function addMultiStudentTimestamp() {
    selectedStudents
      .filter(student => student.selected === true)
      .forEach(student => {
        const studentClub = student.currentClubs.find(
          club =>
            club.day ===
            parseInt(format(new Date(currentTimesheet.item.date), 'E'))
        );
        addTimestamp({
          student: student._id,
          pickup: {
            family: multiStudent.family,
            pickup: multiStudent.pickup.name,
            pin: multiStudent.pickup.pin
          },
          club: studentClub ? studentClub._id : null,
          timesheet: currentTimesheet.item._id
        });
      });

    setMultiStudent({ students: [] });
    pinInputRef.current.focus();
  }

  function handleStudentChange(index) {
    const newStudents = [...selectedStudents];
    newStudents[index].selected = !newStudents[index].selected;
    setSelectedStudents(newStudents);
  }

  if (selectedStudents.length === 0) {
    return null;
  }

  return (
    <div>
      {selectedStudents.map((student, index) => (
        <button
          className={`p-2 my-2 w-full shadow block border rounded hover:border-blue-500 ${
            student.selected ? 'bg-blue-500 text-white' : 'bg-transparent'
          }`}
          key={student._id}
          onClick={() => handleStudentChange(index)}
        >
          {student.name}
        </button>
      ))}
      <button
        className="p-2 my-2 w-full shadow block border rounded bg-gray-100 hover:bg-blue-500 hover:text-white"
        onClick={() => addMultiStudentTimestamp()}
      >
        Select
      </button>
    </div>
  );
}
