import React from 'react';

export default ({ family }) => {
  return (
    <ul>
      <li>{family.name}</li>
      {family.students &&
        family.students.map(student =>
          student ? (
            <ul>
              <li>{student.name}</li>
              <li>{student.grade}</li>
            </ul>
          ) : (
            <p>No student assigned!</p>
          )
        )}
      {family.pickups &&
        family.pickups.map(pickup =>
          pickup ? (
            <ul>
              <li>{pickup.name}</li>
              <li>{pickup.pin}</li>
            </ul>
          ) : (
            <p>No pickups assigned!</p>
          )
        )}
    </ul>
  );
};
