import React from 'react';
import moment from 'moment';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function Clubs(props) {
  return (
    <div>
      {props.clubs
        .filter(club => {
          if (props.day === 'all') {
            return true;
          }
          return club.day === props.day;
        })
        .map((club, index) => (
          <div key={index}>
            {daysOfWeek[club.day]}: {club.club}
          </div>
        ))}
    </div>
  );
}
