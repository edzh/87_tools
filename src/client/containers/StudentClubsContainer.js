import { connect } from 'react-redux';

import {
  getCurrentSessionClubs,
  getCurrentSession
} from '../actions/sessionActions';

const mapStateToProps = (state, ownProps) => {
  return {
    studentId: ownProps.studentId,
    currentStudent: state.student.currentStudent,
    isAuthenticated: state.user.isAuthenticated,
    currentSession: state.session.currentSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentSessionClubs: sessionId => {
      dispatch(getCurrentSessionClubs(sessionId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    }
  };
};
