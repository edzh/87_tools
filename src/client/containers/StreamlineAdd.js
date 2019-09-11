import React, { useState } from 'react';
import { connect } from 'redux';
import { Formik, Form, Field } from 'formik';

import { addStudent } from '../actions/studentActions';

export default function StreamlineAdd({ addStudent, programId }) {
  const [alert, setAlert] = useState(null);

  return (
    <Formik
      initialValues={{
        studentName: '',
        grade: ''
      }}
      onSubmit={values => {
        addStudent({
          name: values.studentName,
          grade: values.grade,
          program: programId
        });
      }}
    >
      {() => (
        <Form>
          <Field name="studentName" className="border rounded" />
          <Field name="grade" component="select" className="border rounded">
            <option value="">---</option>
            <option value="0">K</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <button type="submit">Create Student</button>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    recentStudent: state.student.recentStudent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStudent: student => {
      dispatch(addStudent(student));
    }
  };
};
