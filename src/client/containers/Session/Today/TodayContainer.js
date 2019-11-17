import { connect } from 'react-redux';
import { getProgramStudents } from '../../../actions/programActions';
import { getDateTimesheetTimestamps } from '../../../actions/timeclockActions';
import Today from '../../../components/Session/Today/Today';

const mapStateToProps = state => {
  return {
    students: state.students,
    programId: state.currentSession.item
      ? state.currentSession.item.program
      : null,
    timestamp: state.timestamp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProgramStudents: programId => {
      dispatch(getProgramStudents(programId));
    },
    getDateTimesheetTimestamps: (date, io) => {
      dispatch(getDateTimesheetTimestamps(date, io));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Today);
