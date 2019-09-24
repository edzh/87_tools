import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import {
  deleteTimestamp,
  getTimesheetTimestamps
} from '../../actions/timeclockActions';

import Filters from '../../components/Timeclock/Filters';

function TimestampList({
  currentTimesheet,
  getTimesheetTimestamps,
  timestamps,
  clubs,
  deleteTimestamp,
  isFetching
}) {
  if (!currentTimesheet.item || currentTimesheet.isFetching) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    getTimesheetTimestamps(currentTimesheet.item._id);
  }, []);

  return (
    <div>
      <ul>
        {timestamps &&
          timestamps.map(timestamp => (
            <li className="border-b flex text-sm" key={timestamp._id}>
              <p className="w-24">{format(timestamp.datetime, 'hh:mm a')}</p>
              <p className="w-64">
                <Link to={`/student/${timestamp.student._id}`}>
                  {timestamp.student.name}
                </Link>
              </p>
              <p className="w-64">
                <Link to={`/club/${timestamp.club && timestamp.club._id}`}>
                  {timestamp.club && timestamp.club.name}
                </Link>
              </p>
              <p className="w-8">{timestamp.fobStatus}</p>
              <p
                className={`cursor-pointer text-lg text-red-200 font-bold -my-1 ml-auto hover:text-red-500 rounded`}
                onClick={() => deleteTimestamp(timestamp._id)}
              >
                ×
              </p>
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
    default:
      throw new Error('Unknown filter: ' + filter);
  }
}

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs,
    timestamps: getFilteredTimestamps(
      state.timestamp.items,
      state.timestamp.filter
    ),
    isFetching: state.timestamp.isFetching,
    currentTimesheet: state.timesheet.currentTimesheet
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimestampList);
