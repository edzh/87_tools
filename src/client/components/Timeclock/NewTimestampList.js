import React from 'react';

export default function TimestampList({ timestamps, clubs, students }) {
  console.log(timestamps.items);

  return (
    <ul>
      {timestamps.items &&
        clubs.items &&
        students.items &&
        timestamps.items.map(timestamp => (
          <li key={timestamp._id}>
            {timestamp.student.name} {timestamp.club && timestamp.club.name}
          </li>
        ))}
    </ul>
  );
}
