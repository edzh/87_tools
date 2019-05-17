import React, { useState, useEffect } from 'react';

export default function StudentSelector(props) {
  const { family } = props;
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    setSelectedStudents(
      family.reduce((selected, student) => {
        selected.push({
          _id: student._id,
          name: student.name,
          selected: false
        });

        return selected;
      }, [])
    );
  }, [family]);

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
          className={`p-2 my-2 w-full shadow block border rounded hover:border-blue ${
            student.selected ? 'bg-blue text-white' : 'bg-transparent'
          }`}
          key={student._id}
          onClick={() => handleStudentChange(index)}
        >
          {student.name}
        </button>
      ))}
      <button
        className="p-2 my-2 w-full shadow block border rounded bg-grey-lightest hover:bg-blue hover:text-white"
        onClick={() =>
          props.handleFamily(
            selectedStudents.filter(student => student.selected === true)
          )
        }
      >
        Select
      </button>
    </div>
  );
}
