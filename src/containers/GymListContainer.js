import { connect } from 'react-redux';

import { removeStudentFromGym } from '../actions/postcareLocationsActions';

import GymList from '../components/GymList';

const mapStateToProps = state => {
  return {
    gym: state.gym
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeStudentFromGym: student => {
      dispatch(removeStudentFromGym(student));
    }
  };
};

const GymListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GymList);

export default GymListContainer;
