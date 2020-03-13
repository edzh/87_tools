import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  setStudent,
  getCurrentStudent,
  updateCurrentStudent,
  deleteCurrentStudent
} from '../../actions/studentActions';
import { getCurrentSession } from '../../actions/sessionActions';
import { getClubsBySession } from '../../actions/clubActions';
import { getCurrentProgram } from '../../actions/programActions';

import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';

import StudentDetails from '../../components/Student/StudentDetails';
import StudentHeader from '../../components/Student/StudentHeader';

function StudentPage({
  isAuthenticated,
  currentStudent,
  currentSession,
  updateCurrentStudent,
  deleteCurrentStudent,
  ...props
}) {
  const [student, setStudent] = useState(null);
  const [editDetails, setEditDetails] = useState(false);

  useEffect(() => {
    props.getCurrentStudent(props.studentId);
  }, []);

  useEffect(() => {
    props.currentProgramId && props.getCurrentProgram(props.currentProgramId);
  }, [props.currentProgramId]);

  if (!currentStudent) {
    return null;
  }

  return (
    <div>
      <StudentHeader
        currentStudent={currentStudent.item}
        studentId={props.studentId}
      />
      <StudentDetails
        currentStudent={currentStudent.item}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        updateCurrentStudent={updateCurrentStudent}
        deleteCurrentStudent={deleteCurrentStudent}
        currentSession={currentSession}
      />
      {props.routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentId: ownProps.match.params.id,
    currentStudent: state.currentStudent,
    isAuthenticated: state.user.isAuthenticated,
    currentSession: state.currentSession,
    currentProgramId: state.user.item.currentProgram
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentStudent: studentId => {
      dispatch(getCurrentStudent(studentId));
    },
    updateCurrentStudent: student => {
      dispatch(updateCurrentStudent(student));
    },
    getClubsBySession: sessionId => {
      dispatch(getClubsBySession(sessionId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    },
    deleteCurrentStudent: studentId => {
      dispatch(deleteCurrentStudent(studentId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
