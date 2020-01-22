import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateCurrentStudent } from '../../actions/studentActions';

import StudentFamilyDetails from '../../components/Student/StudentFamilyDetails';

function StudentFamily({ currentStudent, updateCurrentStudent }) {
  return (
    <div>
      <StudentFamilyDetails currentStudent={currentStudent.item} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentId: ownProps.studentId,
    currentStudent: state.currentStudent,
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentStudent: student => {
      dispatch(updateCurrentStudent(student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentFamily);
