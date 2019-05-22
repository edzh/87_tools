import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { setStudent } from '../actions/studentActions';
import StudentDetails from '../components/Student/StudentDetails';
import StudentFamily from '../components/Student/StudentFamily';
import StudentClubs from '../components/Student/StudentClubs';

import { apiUrl } from 'config';

function StudentPage({ isAuthenticated, ...props }) {
  const [student, setStudent] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [editFamily, setEditFamily] = useState(false);
  const [editClubs, setEditClubs] = useState(false);

  useEffect(() => {
    props.setStudent(props.student);

    fetch(`${apiUrl}/api/student/${props.student}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => setStudent(json.data));
  }, [editDetails, editFamily, editClubs]);

  if (!student) {
    return null;
  }

  return (
    <div>
      <StudentDetails
        student={student}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />
      <StudentFamily
        student={student}
        family={student.family}
        editFamily={editFamily}
        setEditFamily={setEditFamily}
      />
      <StudentClubs
        student={student}
        editClubs={editClubs}
        setEditClubs={setEditClubs}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: ownProps.student,
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStudent: student => {
      dispatch(setStudent(student));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
