import React from 'react';

const intToGrade = ['K', '1st', '2nd', '3rd', '4th', '5th'];
const intToDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function StudentDetails(props) {
  const { student } = props;

  return (
    <ul className="list-reset">
      <li>{student.name}</li>
      <li>{intToGrade[student.grade]}</li>
      <li>{student.pin}</li>
      {student.family && (
        <div>
          <li>{student.family.name}</li>
          <li>
            Pickups
            {student.family.pickups.map((pickup, index) => (
              <ul className="list-reset" key={index}>
                <li>{pickup.name}</li>
                <li>{pickup.pin}</li>
              </ul>
            ))}
          </li>
        </div>
      )}
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
    </ul>
  );
}
