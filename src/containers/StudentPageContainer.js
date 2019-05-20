import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { setStudent } from '../actions/studentActions';

import StudentDetails from '../components/Student/StudentDetails';
import EditStudent from '../components/Student/EditStudent';

import StudentFamily from '../components/Student/StudentFamily';
import { apiUrl } from 'config';

function StudentPage(props) {
  const [student, setStudent] = useState(null);
  const [editDetails, setEditDetails] = useState(false);
  const [editFamily, setEditFamily] = useState(false);
  useEffect(() => {
    props.setStudent(props.student);

    fetch(`${apiUrl}/api/student/${props.student}`)
      .then(response => response.json())
      .then(json => setStudent(json.data));
  }, [editDetails, editFamily]);

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
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: ownProps.student
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
