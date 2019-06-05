import React from 'react';
import { Link } from 'react-router-dom';

import { daysOfWeek } from '../Student/Clubs';

export default function ClubList(props) {
  console.log(props.clubs);

  return (
    <div>
      {props.clubs.map(club => (
        <div key={club._id}>
          <Link to={`/club/${club._id}`}>
            {club.name} {daysOfWeek[club.day]}
          </Link>
          {/*          <ul>
            {club.students.map(student => (
              <li>{student.name}</li>
            ))}
          </ul>*/}
        </div>
      ))}
    </div>
  );
}
