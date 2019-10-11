import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from './SessionForm';
import MainDetailsHeader from '../Details/MainDetailsHeader';
import { format } from 'date-fns';

export default props => {
  return (
    <div>
      <ul className="">
        {props.sessions.items &&
          props.sessions.items.map(session => (
            <li className="flex p-2 hover:bg-gray-100" key={session._id}>
              <div className="w-64">
                <Link
                  className="text-blue-500 hover:text-blue-400"
                  to={`/session/${session._id}`}
                >
                  {session.name}
                </Link>
              </div>
              <div>
                {format(session.start, 'MMM DD YYYY')} -{' '}
                {format(session.end, 'MMM DD YYYY')}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
