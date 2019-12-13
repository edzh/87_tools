import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getSessionClubs,
  getCurrentSession
} from '../../actions/sessionActions';
import { updateCurrentStudent } from '../../actions/studentActions';
import { getProgramSessions } from '../../actions/programActions';

import EditStudentClubs from '../../components/Student/EditStudentClubsNew';

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
    currentStudent.allIds &&
      getProgramSessions(currentStudent.byId[currentStudent.allIds].program);
  }, [currentStudent.isFetching]);

  useEffect(() => {
    currentSession.item._id && getSessionClubs(currentSession.item._id);
  }, [currentSession.item._id]);

  if (!currentStudent.item) return null;

  return (
    <div>
      {/*currentStudent.item.currentClubs.map(club => club.name)*/}
      <EditStudentClubs
        clubs={clubs}
        sessions={sessions}
        getCurrentSession={getCurrentSession}
        getSessionClubs={getSessionClubs}
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
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getProgramSessions: programId => {
      dispatch(getProgramSessions(programId));
    },
    updateCurrentStudent: student => {
      dispatch(updateCurrentStudent(student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentClubs);
