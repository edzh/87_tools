import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchTimesheets } from '../actions/timesheetActions';

import TimesheetList from '../components/Timesheet/TimesheetList';

function Timesheet(props) {
  useEffect(() => {
    props.fetchTimesheets();
  }, []);

  return (
    <TimesheetList
      timesheets={props.timesheets}
      isFetching={props.isFetching}
    />
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.timesheets.isFetching,
    timesheets: state.timesheets.timesheets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTimesheets: () => {
      dispatch(fetchTimesheets());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timesheet);
