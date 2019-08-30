import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSessionClubs, getCurrentSession } from '../actions/sessionActions';

import { getProgramSessions } from '../actions/programActions';

import EditStudentClubs from '../components/Student/EditStudentClubsNew';

function StudentClubs(props) {
  useEffect(() => {
    props.currentStudent.item &&
      props.getProgramSessions(props.currentStudent.item.program);
  }, [props.currentStudent.isFetching]);

  useEffect(() => {
    props.currentSession.item &&
      props.getSessionClubs(props.currentSession.item._id);
  }, [props.currentSession.isFetching]);

  if (!props.currentStudent.item) return null;

  return (
    <div>
      {props.sessions.items &&
        props.sessions.items.map(session => session.name)}
      {props.currentStudent.item.currentClubs.map(club => club.name)}
      <EditStudentClubs />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentId: ownProps.studentId,
    currentStudent: state.student.currentStudent,
    isAuthenticated: state.user.isAuthenticated,
    currentSession: state.session.currentSession,
    sessions: state.session.sessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getProgramSessions: programId => {
      dispatch(getProgramSessions(programId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentClubs);
