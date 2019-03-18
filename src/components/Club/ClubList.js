import React from 'react';
import { Link } from 'react-router-dom';

import { daysOfWeek } from '../Student/Clubs';

export default function ClubList(props) {
  return (
    <ul>
      {props.clubs.map(club => (
        <li>
          <Link to={`/club/${club._id}`}>
            {club.name} {daysOfWeek[club.day]}
          </Link>
          {/*          <ul>
            {club.students.map(student => (
              <li>{student.name}</li>
            ))}
          </ul>*/}
        </li>
      ))}
    </ul>
  );
}
