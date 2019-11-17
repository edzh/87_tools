import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import { addStudent } from '../actions/studentActions';
import { addFamily } from '../actions/familyActions';

import StreamlineStudentForm from '../components/Streamline/StreamlineStudentForm';
import StreamlineFamilyForm from '../components/Streamline/StreamlineFamilyForm';

function StreamlineAdd({
  addFamily,
  addStudent,
  programId,
  recentFamily,
  recentStudent
}) {
  const [alert, setAlert] = useState(null);

  return (
    <div>
      <StreamlineFamilyForm addFamily={addFamily} programId={programId} />
      <StreamlineStudentForm
        addStudent={addStudent}
        programId={programId}
        recentFamily={recentFamily}
        recentStudent={recentStudent}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    recentStudent: state.students.recentStudent,
    recentFamily: state.families.recentFamily
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStudent: student => {
      dispatch(addStudent(student));
    },
    addFamily: family => {
      dispatch(addFamily(family));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamlineAdd);
