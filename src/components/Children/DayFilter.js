import React from 'react';

export default function DayList(props) {
  return [
    <button value="all" onClick={props.onDayChange}>
      All
    </button>,
    <button value="1" onClick={props.onDayChange}>
      Monday
    </button>,
    <button value="2" onClick={props.onDayChange}>
      Tuesday
    </button>,
    <button value="3" onClick={props.onDayChange}>
      Wednesday
    </button>,
    <button value="4" onClick={props.onDayChange}>
      Thursday
    </button>,
    <button value="5" onClick={props.onDayChange}>
      Friday
    </button>
  ];
}
