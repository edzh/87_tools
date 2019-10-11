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
  deleteTimestamp
}) {
  useEffect(() => {
    currentTimesheet.item && getTimesheetTimestamps(currentTimesheet.item._id);
  }, [currentTimesheet.item]);

  if (!currentTimesheet.item || currentTimesheet.isFetching) {
    return <div data-testid="load">Loading...</div>;
  }

  return (
    <div>
      <ul data-testid="timestamp-ul">
        {timestamps &&
          timestamps.map(timestamp => (
            <li className="border-b text-sm" key={timestamp._id}>
              <ul className="flex">
                <li className="w-24">
                  {format(timestamp.datetime, 'hh:mm a')}
                </li>
                <li className="w-64">
                  <Link to={`/student/${timestamp.student._id}`}>
                    {timestamp.student.name}
                  </Link>
                </li>
                <li className="w-64">
                  <Link to={`/club/${timestamp.club && timestamp.club._id}`}>
                    {timestamp.club && timestamp.club.name}
                  </Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimestampList);
