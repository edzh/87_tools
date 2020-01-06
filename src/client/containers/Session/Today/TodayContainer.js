import { connect } from 'react-redux';
import { getStudentsByProgram } from '../../../actions/studentActions';
import { getDateTimesheetTimestamps } from '../../../actions/timeclockActions';
import { getClubsBySession } from '../../../actions/clubActions';

import Today from '../../../components/Session/Today/Today';

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.students.items,
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
    getClubsBySession: sessionId => {
      dispatch(getClubsBySession(sessionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
