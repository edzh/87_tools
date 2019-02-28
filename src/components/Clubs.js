import React from 'react';

export default function Clubs(props) {
  return (
    <div>
      {props.clubs.map((club, index) => (
        <div key={index}>{club.club}</div>
      ))}
    </div>
  );
}
