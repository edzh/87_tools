import React from 'react';

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
        .sort((a, b) => {
          return a.day - b.day;
        })
        .filter(club => {
          if (props.day === 'all') {
            return true;
          }

          return `${club.day}` === props.day;
        })
        .map((club, index) => (
          <div key={index}>
            {daysOfWeek[club.day]}: {club.name}
          </div>
        ))}
    </div>
  );
}
