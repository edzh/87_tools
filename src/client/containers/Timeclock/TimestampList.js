import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import {
  deleteTimestamp,
  getTimesheetTimestamps
} from '../../actions/timeclockActions';

function TimestampList({
  currentTimesheet,
  getTimesheetTimestamps,
  timestamps,
  clubs,
  deleteTimestamp
}) {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    currentTimesheet.item && getTimesheetTimestamps(currentTimesheet.item._id);
    setRefresh(false);
  }, [refresh, currentTimesheet.item]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setRefresh(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [refresh]);

  if (!currentTimesheet.item || currentTimesheet.isFetching) {
    return <div data-testid="load">Loading...</div>;
  }

  return (
    <div>
      <ul data-testid="timestamp-ul">
        {timestamps &&
          timestamps.map(timestamp => (
            <li
              className="border-b border-gray-200 py-1 text-sm hover:bg-gray-100"
              key={timestamp._id}
            >
              <ul className="flex">
                <li className="w-24">
                  {format(parseISO(timestamp.datetime), 'hh:mm a')}
                </li>
                <li className="w-64">
                  {timestamp.student ? (
                    <Link
                      className="text-blue-500 hover:text-blue-400"
                      to={`/student/${timestamp.student._id}`}
                    >
                      {timestamp.student.name}
                    </Link>
                  ) : (
                    'Student not found!'
                  )}
                </li>
                <li className="w-64">
                  {timestamp.club ? (
                    <Link
                      className="text-blue-500 hover:text-blue-400"
                      to={`/club/${timestamp.club._id}`}
                    >
                      {timestamp.club.name}
                    </Link>
                  ) : (
                    'No club'
                  )}
                </li>
                <li className="w-8">{timestamp.fobStatus}</li>
                <li
                  className={`cursor-pointer text-lg text-red-200 font-bold -my-1 ml-auto hover:text-red-500 rounded`}
                  onClick={() => deleteTimestamp(timestamp._id)}
                >
                  ×
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}

function getFilteredTimestamps(timestamps, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return timestamps;
    case 'SHOW_LOST':
      return timestamps.filter(timestamp => timestamp.fobStatus === 'Lost');
    case 'SHOW_DAMAGED':
      return timestamps.filter(timestamp => timestamp.fobStatus === 'Damaged');
    case 'SHOW_HOME':
      return timestamps.filter(timestamp => timestamp.fobStatus === 'Home');
    case 'SHOW_DNF':
      return timestamps.filter(timestamp => timestamp.fobStatus === 'DNF');
    default:
      throw new Error('Unknown filter: ' + filter);
  }
}

const mapStateToProps = state => {
  return {
    clubs: state.clubs,
    timestamps: getFilteredTimestamps(
      state.timestamp.items,
      state.timestamp.filter
    ),
    currentTimesheet: state.currentTimesheet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTimestamp: timestampId => {
      dispatch(deleteTimestamp(timestampId));
    },
    getTimesheetTimestamps: timesheetId => {
      dispatch(getTimesheetTimestamps(timesheetId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimestampList);
