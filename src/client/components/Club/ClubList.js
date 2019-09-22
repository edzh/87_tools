import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { daysOfWeek } from 'utils/constants';

import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ClubList(props) {
  const [day, setDay] = useState(1);

  return (
    <div className="border shadow-md">
      <MainDetailsHeader>Clubs</MainDetailsHeader>
      <div className="flex w-full">
        {daysOfWeek.map(weekDay => (
          <div
            key={weekDay}
            className={`${
              day === daysOfWeek.indexOf(weekDay)
                ? 'border-r border-l border-t'
                : 'bg-gray-100 border-b'
            } px-4 py-2 rounded-t w-full cursor-pointer`}
            onClick={() => setDay(daysOfWeek.indexOf(weekDay))}
          >
            <p className="text-center">{weekDay}</p>
          </div>
        ))}
      </div>
      {props.clubs.items &&
        props.clubs.items
          .filter(club => club.day === day)
          .map(club => (
            <div className="p-2 border-b" key={club._id}>
              <Link
                className="text-blue-500 hover:text-blue-400 no-underline"
                to={`/club/${club._id}`}
              >
                {club.name}
              </Link>
            </div>
          ))}
    </div>
  );
}
