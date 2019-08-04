import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StudentsList from '../components/Student/StudentList';

import { fetchStudents } from '../actions/studentActions';

function PinLookup(props) {
  useEffect(() => {
    props.fetchStudents();
  }, []);

  return (
    <div>
      <h2>Pin Lookup</h2>
      <StudentsList students={props.students} isFetching={props.isFetching} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.student.isFetching,
    students: state.student.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents: () => {
      dispatch(fetchStudents());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PinLookup);
