import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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
  if (!currentTimesheet.item || currentTimesheet.isFetching) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    getTimesheetTimestamps(currentTimesheet.item._id);
  }, []);

  return (
    <div>
      <h2>
        {format(currentTimesheet.item.date, 'dddd, MMMM D')} Sign{' '}
        {currentTimesheet.item.io} Timesheet
      </h2>
      <ul className="">
        {timestamps.items &&
          timestamps.items.map(timestamp => (
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
                className={`cursor-pointer text-lg text-red-lighter font-bold -my-1 ml-auto hover:text-red rounded`}
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

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs,
    timestamps: state.timestamp,
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
