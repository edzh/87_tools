import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTimesheets, setTimesheet } from '../actions/timesheetActions';

import TimesheetList from '../components/Timesheet/TimesheetList';

function Timesheet(props) {
  useEffect(() => {
    props.fetchTimesheets();
  }, []);

  return (
    <div>
      <TimesheetList
        timesheets={props.timesheets}
        isFetching={props.isFetching}
      />
      <Link to="/timesheet/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue text-white hover:bg-grey-lightest hover:text-blue text-center no-underline border rounded">
          Create Timesheet
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.timesheets.isFetching,
    timesheets: state.timesheets.fetchedTimesheets
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
