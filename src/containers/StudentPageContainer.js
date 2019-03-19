import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { setStudent } from '../actions/studentActions';

import StudentDetails from '../components/Student/StudentDetails';
import EditStudent from '../components/Student/EditStudent';

function StudentPage(props) {
  const [student, setStudent] = useState(null);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    props.setStudent(props.student);

    fetch(`http://localhost:3001/api/student/${props.student}`)
      .then(response => response.json())
      .then(json => setStudent(json.data));
  }, [edit]);

  if (!student) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setEdit(!edit)}>Edit</button>
      {edit ? (
        <EditStudent student={student} />
      ) : (
        <StudentDetails student={student} />
      )}
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
