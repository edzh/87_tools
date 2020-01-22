import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { addStudent, getStudentsByProgram } from '../../actions/studentActions';

import StudentForm from '../../components/Student/StudentForm';
import StudentAlert from '../../components/Student/StudentAlert';
import StudentList from '../../components/Student/StudentList';

function Student({ programId, students, addStudent, getStudentsByProgram }) {
  useEffect(() => {
    getStudentsByProgram(programId);
  }, []);

  return (
    <div>
      <StudentList students={students.items} />
      <StudentAlert
        students={students.items}
        recentStudent={students.recentStudent}
      />
      <StudentForm programId={programId} addStudent={addStudent} />
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
