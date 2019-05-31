import React from 'react';

export const daysOfWeek = [
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
          <div key={club._id}>
            {daysOfWeek[club.day]}: {club.name}
          </div>
        ))}
    </div>
  );
}