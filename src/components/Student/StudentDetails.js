import React from 'react';
import { Link } from 'react-router-dom';
import EditStudentDetails from './EditStudentDetails';

const intToGrade = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade'
];

export default function StudentDetails({
  editDetails,
  setEditDetails,
  student
}) {
  return (
    <div className="">
      <div className="border rounded shadow-md">
        <div className="flex border-b bg-grey-darkest w-full">
          <h2 className="m-4 font-normal text-white">{student.name}</h2>
          <button
            className={`${
              editDetails ? 'bg-blue text-white' : 'bg-white'
            } m-4 ml-auto text-xs border rounded shadow p-1`}
            onClick={() => setEditDetails(!editDetails)}
          >
            Edit
          </button>
        </div>
        {editDetails ? (
          <EditStudentDetails
            student={student}
            editDetails={editDetails}
            setEditDetails={setEditDetails}
          />
        ) : (
          <div>
            <div className="m-4 flex">
              <h3 className="w-32 text-xl">Grade</h3>
              <p className="text-xl">{intToGrade[student.grade]}</p>
            </div>
            <div className="m-4 flex">
              <h3 className="w-32 text-xl">PIN</h3>
              <p className="text-xl">{student.pin}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
