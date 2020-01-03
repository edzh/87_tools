import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrentSession } from '../../actions/sessionActions';
import { getClubsBySession } from '../../actions/clubActions';
import { updateCurrentStudent } from '../../actions/studentActions';
import { getSessionsByProgram } from '../../actions/sessionActions';

import EditStudentClubs from '../../components/Student/EditStudentClubs';

function StudentClubs({
  currentStudent,
  currentSession,
  clubs,
  sessions,
  getSessionsByProgram,
  getClubsBySession,
  getCurrentSession,
  updateCurrentStudent
}) {
  useEffect(() => {
    currentStudent.item.allIds &&
      getSessionsByProgram(
        currentStudent.item.byId[currentStudent.item.allIds].program
      );
  }, [currentStudent.isFetching]);

  useEffect(() => {
    currentSession.item.allIds && getClubsBySession(currentSession.item.allIds);
  }, [currentSession.item.allIds]);

  if (!currentStudent.item) return null;

  return (
    <div>
      <EditStudentClubs
        clubs={clubs}
        sessions={sessions.items}
        getCurrentSession={getCurrentSession}
        getClubsBySession={getClubsBySession}
        currentStudent={currentStudent.item}
        updateCurrentStudent={updateCurrentStudent}
        currentSession={currentSession}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentId: ownProps.studentId,
    currentStudent: state.currentStudent,
    isAuthenticated: state.user.isAuthenticated,
    currentSession: state.currentSession,
    sessions: state.sessions,
    clubs: state.clubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubsBySession: sessionId => {
      dispatch(getClubsBySession(sessionId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getSessionsByProgram: programId => {
      dispatch(getSessionsByProgram(programId));
    },
    updateCurrentStudent: student => {
      dispatch(updateCurrentStudent(student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentClubs);
