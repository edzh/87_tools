import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StudentsList from '../components/Student/StudentList';

import styles from './css/PinLookup.module.css';

import { fetchStudents } from '../actions/studentActions';

function PinLookup(props) {
  useEffect(() => {
    props.fetchStudents();
  }, []);

  return (
    <div className={styles.container}>
      <StudentsList students={props.students} isFetching={props.isFetching} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.pinLookup.isFetching,
    students: state.pinLookup.students
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
