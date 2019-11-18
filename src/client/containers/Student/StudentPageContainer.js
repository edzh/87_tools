import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  setStudent,
  getCurrentStudent,
  updateCurrentStudent
} from '../../actions/studentActions';
import {
  getSessionClubs,
  getCurrentSession
} from '../../actions/sessionActions';
import { getCurrentProgram } from '../../actions/programActions';

import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';

import StudentDetails from '../../components/Student/StudentDetails';
import EditStudent from '../../components/Student/EditStudentNew';
import StudentClubs from '../../components/Student/StudentClubs';
import StudentHeader from '../../components/Student/StudentHeader';

function StudentPage({
  isAuthenticated,
  currentStudent,
  currentSession,
  updateCurrentStudent,
  ...props
}) {
  const [student, setStudent] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [editFamily, setEditFamily] = useState(false);
  const [editClubs, setEditClubs] = useState(false);

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
      <StudentHeader student={currentStudent} studentId={props.studentId} />
      <StudentDetails
        student={currentStudent.item}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        updateCurrentStudent={updateCurrentStudent}
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
    currentProgramId: state.user.data.currentProgram
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
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
