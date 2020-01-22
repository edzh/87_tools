import { connect } from 'react-redux';

import { addTimesheet } from '../actions/timesheetActions';
import { getSessionTimesheets } from '../actions/sessionActions';

import Timesheet from '../components/Timesheet/Timesheet';

const mapStateToProps = (state, ownProps) => {
  return {
    timesheets: state.timesheets,
    sessionId: ownProps.match.params.id,
    currentSession: state.currentSession
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

export default connect(mapStateToProps, mapDispatchToProps)(Timesheet);
