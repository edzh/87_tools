import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { fetchStudents, addStudent } from '../actions/studentActions';
function Student(props) {
  useEffect(() => {
    props.fetchStudents();
  }, []);

  return (
    <div>
      {props.students.map(student => student.name)}

      <Formik
        initialValues={{
          studentName: '',
          grade: '',
          pin: ''
        }}
        onSubmit={(values, action) => {
          props.addStudent({
            name: values.studentName,
            grade: values.grade,
            pin: values.pin,
            program: props.programId
          });
        }}
      >
        {() => (
          <Form>
            <Field name="studentName" className="border" />
            <Field name="grade" component="select" className="border">
              <option value="0">K</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <Field name="pin" className="border" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    students: state.student.students,
    programId: state.program.currentProgram.item._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents: () => {
      dispatch(fetchStudents());
    },
    addStudent: student => {
      dispatch(addStudent(student));
    }
  };
};

const StudentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

export default StudentContainer;
