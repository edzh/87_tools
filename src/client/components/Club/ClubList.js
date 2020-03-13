import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { intToDay } from 'utils/constants';

export default function ClubList({ clubs }) {
  const [day, setDay] = useState(1);
  if (!clubs.allIds.length) return null;

  return (
    <div className="border shadow bg-white mt-2">
      <div className="flex w-full">
        {intToDay.map(weekDay => (
          <div
            key={weekDay}
            className={`${
              day === intToDay.indexOf(weekDay)
                ? 'border-r border-l border-t'
                : 'bg-gray-100 border-b'
            } px-4 py-2 rounded-t w-full cursor-pointer`}
            onClick={() => setDay(intToDay.indexOf(weekDay))}
          >
            <p className="text-center">{weekDay}</p>
          </div>
        ))}
      </div>
      {clubs.allIds
        .filter(clubId => clubs.byId[clubId].day === day)
        .map(clubId => (
          <div className="p-2 border-b" key={clubId}>
            <Link
              className="text-blue-500 hover:text-blue-400 no-underline"
              to={`/club/${clubId}`}
            >
              {clubs.byId[clubId].name}
            </Link>
          </div>
        ))}
    </div>
  );
}
