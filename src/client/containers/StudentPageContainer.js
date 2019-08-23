import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import {
  setStudent,
  getCurrentStudent,
  updateCurrentStudent
} from '../actions/studentActions';
import {
  getCurrentSessionClubs,
  getCurrentSession
} from '../actions/sessionActions';

import StudentDetails from '../components/Student/StudentDetailsNew';
import EditStudent from '../components/Student/EditStudentNew';
import StudentFamily from '../components/Student/StudentFamily';
import StudentClubs from '../components/Student/StudentClubs';

function StudentPage({
  isAuthenticated,
  currentStudent,
  currentSession,
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
      <StudentDetails
        student={currentStudent}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />
      {/*<EditStudent
              student={currentStudent}
              updateCurrentStudent={props.updateCurrentStudent}
              currentSession={currentSession}
            />*/}
      {/*      <StudentFamily
        student={currentStudent}
        family={currentStudent.family}
        editFamily={editFamily}
        setEditFamily={setEditFamily}
      />
      <StudentClubs
        student={currentStudent}
        editClubs={editClubs}
        setEditClubs={setEditClubs}
      />*/}
    </div>
  );
}

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
    getCurrentStudent: studentId => {
      dispatch(getCurrentStudent(studentId));
    },
    updateCurrentStudent: student => {
      dispatch(updateCurrentStudent(student));
    },
    getCurrentSessionClubs: sessionId => {
      dispatch(getCurrentSessionClubs(sessionId));
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
