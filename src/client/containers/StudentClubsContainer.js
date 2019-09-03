import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSessionClubs, getCurrentSession } from '../actions/sessionActions';
import { updateCurrentStudent } from '../actions/studentActions';
import { getProgramSessions } from '../actions/programActions';

import EditStudentClubs from '../components/Student/EditStudentClubsNew';

function StudentClubs({
  currentStudent,
  currentSession,
  clubs,
  sessions,
  getProgramSessions,
  getSessionClubs,
  getCurrentSession,
  updateCurrentStudent
}) {
  useEffect(() => {
    currentStudent.item && getProgramSessions(currentStudent.item.program);
  }, [currentStudent.isFetching]);

  useEffect(() => {
    currentSession.item && getSessionClubs(currentSession.item._id);
  }, [currentSession.isFetching]);

  if (!currentStudent.item) return null;

  return (
    <div>
      {currentStudent.item.currentClubs.map(club => club.name)}
      <EditStudentClubs
        clubs={clubs}
        sessions={sessions}
        getCurrentSession={getCurrentSession}
        getSessionClubs={getSessionClubs}
        currentStudent={currentStudent}
        updateCurrentStudent={updateCurrentStudent}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentId: ownProps.studentId,
    currentStudent: state.student.currentStudent,
    isAuthenticated: state.user.isAuthenticated,
    currentSession: state.session.currentSession,
    sessions: state.session.sessions,
    clubs: state.club.clubs
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
