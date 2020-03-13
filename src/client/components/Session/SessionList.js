import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import SessionForm from './SessionForm';
import DefaultSessionButton from '../../containers/Session/DefaultSessionButton';

export default ({ sessions, currentProgram }) => {
  if (!sessions.allIds.length) return null;
  if (!currentProgram.allIds) return null;

  return (
    <div>
      <ul className="bg-gray-100 border-t border-b border-gray-400">
        {sessions.allIds.map(sessionId => (
          <li
            className="flex border my-2 border-gray-400 rounded p-2 bg-white"
            key={sessionId}
          >
            <div className="w-64">
              <Link
                className="text-blue-500 hover:text-blue-400"
                to={`/session/${sessionId}`}
              >
                {sessions.byId[sessionId].name}
              </Link>
            </div>
            <div>
              {format(parseISO(sessions.byId[sessionId].start), 'MMM dd yyyy')}{' '}
              - {format(parseISO(sessions.byId[sessionId].end), 'MMM dd yyyy')}
            </div>
            {currentProgram.byId[currentProgram.allIds].currentSession ===
            sessionId ? (
              <div className="text-sm mx-6 my-auto">Default Session</div>
            ) : (
              <DefaultSessionButton sessionId={sessionId} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
