import React from 'react';

const intToGrade = ['K', '1st', '2nd', '3rd', '4th', '5th'];

export default function StudentDetails(props) {
  const { student } = props;

  return (
    <ul>
      <li>{student.name}</li>
      <li>{intToGrade[student.grade]}</li>
      <li>{student.pin}</li>
      {student.family && (
        <div>
          <li>{student.family.name}</li>
          <li>
            Pickups
            {student.family.pickups.map(pickup => (
              <ul>
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
          .map(club => (
            <ul>
              <li>{club.name}</li>
              <li>{club.day}</li>
            </ul>
          ))}
      </li>
    </ul>
  );
}
