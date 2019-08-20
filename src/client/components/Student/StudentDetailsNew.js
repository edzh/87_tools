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
const intToDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function StudentDetails({
  editDetails,
  setEditDetails,
  student
}) {
  if (!student._id) {
    return null;
  }

  return (
    <div className="border rounded shadow">
      <div className="flex border-b bg-grey-darkest w-full rounded-t">
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
      <div className="m-4">
        <Link to={`/family/id/${student.family._id}`} className="no-underline">
          <p className="text-xl text-blue-dark hover:text-blue">
            {student.family.name}
          </p>
        </Link>
        <h3 className="my-2">Pickups</h3>
        {student.family.pickups.map((pickup, index) => (
          <div className="flex" key={index}>
            <p className="w-64 text-bold">{pickup.name}</p>
            <p>{pickup.pin}</p>
          </div>
        ))}
      </div>
      <div className="p-4">
        {student.clubs &&
          student.clubs.map((club, index) => (
            <div className="flex m-2" key={index}>
              <p className="w-32">{intToDay[club.day]}</p>
              <Link className="no-underline" to={`/club/id/${club._id}`}>
                <p className="text-blue-dark hover:text-blue">{club.name}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
