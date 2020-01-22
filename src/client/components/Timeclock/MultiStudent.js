import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const clubs = useSelector(state => state.clubs.items);
  useEffect(() => {
    setSelectedStudents(
      multiStudent.students.reduce((selected, student) => {
        const signedIn = signInTimestamps.find(
          timestamp => timestamp.student._id === student._id
        );

        if (signedIn) {
          selected.push({
            _id: student._id,
            name: student.name,
            clubs: student.clubs,
            selected: true
          });
        } else {
          selected.push({
            _id: student._id,
            name: student.name,
            clubs: student.clubs,
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
        const studentClub = student.clubs.find(clubId => {
          if (clubs.byId[clubId]) {
            return (
              clubs.byId[clubId].day ===
              +format(new Date(currentTimesheet.item.date), 'i')
            );
          }
        });

        addTimestamp({
          student: student._id,
          pickup: {
            family: multiStudent.family,
            pickup: multiStudent.pickup.name,
            pin: multiStudent.pickup.pin
          },
          club: studentClub ? studentClub : null,
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
