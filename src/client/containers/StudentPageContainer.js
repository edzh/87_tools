import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import {
  setStudent,
  getCurrentStudent,
  updateCurrentStudent
} from '../actions/studentActions';
import { getCurrentSessionClubs } from '../actions/sessionActions';

import StudentDetails from '../components/Student/StudentDetailsNew';
import EditStudent from '../components/Student/EditStudentNew';
import StudentFamily from '../components/Student/StudentFamily';
import StudentClubs from '../components/Student/StudentClubs';

function StudentPage({
  isAuthenticated,
  currentStudent,
  currentSessionClubs,
  ...props
}) {
  const [student, setStudent] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [editFamily, setEditFamily] = useState(false);
  const [editClubs, setEditClubs] = useState(false);

  useEffect(() => {
    props.getCurrentStudent(props.studentId);
    props.getCurrentSessionClubs('5d56ec4f828f6526182bdcfa');
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
      <EditStudent
        student={currentStudent}
        updateCurrentStudent={props.updateCurrentStudent}
        currentSessionClubs={currentSessionClubs}
      />
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
    currentSessionClubs: state.session.currentSession.clubs
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
