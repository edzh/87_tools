import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { addStudent } from '../../actions/studentActions';
import { getProgramStudents } from '../../actions/programActions';

import StudentForm from '../../components/Student/StudentForm';
import StudentList from '../../components/Student/StudentList';

function Student(props) {
  useEffect(() => {
    props.getProgramStudents(props.programId);
  }, []);

  return (
    <div>
      <StudentList students={props.students} />
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
    getProgramStudents: programId => {
      dispatch(getProgramStudents(programId));
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
