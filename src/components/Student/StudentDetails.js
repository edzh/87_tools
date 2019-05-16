import React from 'react';
import { Link } from 'react-router-dom';
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

export default function StudentDetails({ student }) {
  return (
    <div className="">
      <div className="border rounded p-2">
        <h2>{student.name}</h2>
        <div className="my-2 flex">
          <h3 className="w-16">Grade</h3>
          <p className="text-xl">{intToGrade[student.grade]}</p>
        </div>
        <div className="mt-2 flex">
          <p className="font-bold w-16">PIN</p>
          <p>{student.pin}</p>
        </div>
      </div>

      <div className="border rounded p-2 my-2">
        {student.family && (
          <div className="mb-2">
            <div className="flex">
              <h3 className="w-16">Family</h3>
              <Link
                to={`/family/${student.family._id}`}
                className="text-xl no-underline"
              >
                {student.family.name}
              </Link>
            </div>
            <h3 className="my-2">Pickups</h3>
            {student.family.pickups.map((pickup, index) => (
              <div className="flex" key={index}>
                <p className="w-64 text-bold">{pickup.name}</p>
                <p>{pickup.pin}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <li>
        Clubs
        {student.clubs
          .sort((a, b) => a.day - b.day)
          .map((club, index) => (
            <ul className="ml-2 list-reset flex" key={index}>
              <li className="w-32">{intToDay[club.day]}</li>
              <li>{club.name}</li>
            </ul>
          ))}
      </li>
    </div>
  );
}
