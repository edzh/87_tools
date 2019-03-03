import React from 'react';

export default function GymList(props) {
  return (
    <div>
      <h3>Gym</h3>
      {props.gym.map((student, index) => (
        <div key={index} onClick={() => props.removeChildFromGym(student)}>
          {student.present ? (
            <p>
              {student.name} {student.pin}
            </p>
          ) : (
            <p>
              <strike>{student.name}</strike> {student.pin}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
