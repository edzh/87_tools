import { connect } from 'react-redux';
import { getStudentsByProgram } from '../../../actions/studentActions';
import { getDateTimesheetTimestamps } from '../../../actions/timeclockActions';
import { getSessionClubs } from '../../../actions/sessionActions';

import Today from '../../../components/Session/Today/Today';

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.students,
    programId: state.currentSession.item
      ? state.currentSession.item.program
      : null,
    timestamp: state.timestamp,
    clubs: state.clubs,
    sessionId: ownProps.match.params.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentsByProgram: programId => {
      dispatch(getStudentsByProgram(programId));
    },
    getDateTimesheetTimestamps: (date, io) => {
      dispatch(getDateTimesheetTimestamps(date, io));
    },
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
