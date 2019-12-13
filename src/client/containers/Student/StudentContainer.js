import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { addStudent, getStudentsByProgram } from '../../actions/studentActions';

import StudentForm from '../../components/Student/StudentForm';
import StudentList from '../../components/Student/StudentList';

function Student(props) {
  useEffect(() => {
    props.getStudentsByProgram(props.programId);
  }, []);

  return (
    <div>
      <StudentList students={props.students.items} />
      <StudentForm programId={props.programId} addStudent={props.addStudent} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.students,
    programId: ownProps.match.params.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentsByProgram: programId => {
      dispatch(getStudentsByProgram(programId));
    },
    addStudent: student => {
      dispatch(addStudent(student));
    }
  };
};

const StudentContainer = connect(mapStateToProps, mapDispatchToProps)(Student);

export default StudentContainer;
