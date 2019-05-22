import { connect } from 'react-redux';

import { addStudentToLibrary } from '../actions/postcareLocationsActions';
import { addStudentToGym } from '../actions/postcareLocationsActions';

import Student from '../components/Student/Student';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addStudentToLibrary: student => {
      dispatch(addStudentToLibrary(student));
    },
    addStudentToGym: student => {
      dispatch(addStudentToGym(student));
    }
  };
};

const StudentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

export default StudentContainer;
