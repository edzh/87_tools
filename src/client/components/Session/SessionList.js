import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import SessionForm from './SessionForm';
import MainDetailsHeader from '../Details/MainDetailsHeader';
import DefaultSessionButton from '../../containers/Session/DefaultSessionButton';

export default props => {
  return (
    <div>
      <ul className="bg-gray-100 border-t border-b border-gray-400">
        {props.sessions.items &&
          props.sessions.items.map(session => (
            <li
              className="flex border my-2 border-gray-400 rounded p-2 bg-white"
              key={session._id}
            >
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
              <DefaultSessionButton sessionId={session._id} />
            </li>
          ))}
      </ul>
    </div>
  );
};
