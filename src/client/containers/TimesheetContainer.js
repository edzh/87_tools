import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addTimesheet, setTimesheet } from '../actions/timesheetActions';
import { getSessionTimesheets } from '../actions/sessionActions';

import TimesheetList from '../components/Timesheet/TimesheetList';
import TimesheetForm from '../components/Timesheet/TimesheetForm';

function Timesheet({
  sessionId,
  timesheets,
  addTimesheet,
  getSessionTimesheets
}) {
  console.log(sessionId);
  useEffect(() => {
    getSessionTimesheets(sessionId);
  }, []);

  return (
    <div>
      <TimesheetList timesheets={timesheets} />
      <TimesheetForm sessionId={sessionId} addTimesheet={addTimesheet} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    timesheets: state.timesheet.timesheets,
    sessionId: ownProps.match.params.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSessionTimesheets: sessionId => {
      dispatch(getSessionTimesheets(sessionId));
    },
    addTimesheet: timesheet => {
      dispatch(addTimesheet(timesheet));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timesheet);
