import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  setStudent,
  getCurrentStudent,
  updateCurrentStudent
} from '../actions/studentActions';
import { getSessionClubs, getCurrentSession } from '../actions/sessionActions';

import RouteWithSubroutes from '../components/Route/RouteWithSubroutes';

import StudentDetails from '../components/Student/StudentDetailsNew';
import EditStudent from '../components/Student/EditStudentNew';
import StudentFamily from '../components/Student/StudentFamily';
import StudentClubs from '../components/Student/StudentClubs';

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

  if (!currentStudent) {
    return null;
  }

  return (
    <div>
      <Link to={`/student/${props.studentId}/clubs`}>Clubs</Link>
      <StudentDetails
        student={currentStudent.item}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        updateCurrentStudent={updateCurrentStudent}
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
    currentSession: state.currentSession
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
