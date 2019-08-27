import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { daysOfWeek } from 'utils/constants';

import MainDetailsHeader from '../Details/MainDetailsHeader';

export default function ClubList(props) {
  const [day, setDay] = useState(1);
  const [session, setSession] = useState('');
  console.log(session);

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
                : 'bg-grey-lightest border-b'
            } px-4 py-2 rounded-t w-full cursor-pointer`}
            onClick={() => setDay(daysOfWeek.indexOf(weekDay))}
          >
            <p className="text-center">{weekDay}</p>
          </div>
        ))}
      </div>
      {props.clubs
        .filter(club => club.day === day)
        .filter(club => {
          if (session === '') {
            return true;
          }

          return club.session === session;
        })
        .map(club => (
          <div className="p-2 border-b" key={club._id}>
            <Link
              className="text-blue hover:text-blue-light no-underline"
              to={`/club/id/${club._id}`}
            >
              {club.name}
            </Link>
          </div>
        ))}
    </div>
  );
}
