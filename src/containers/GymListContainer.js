import { connect } from 'react-redux';

import { removeChildFromGym } from '../actions/postcareLocationsActions';

import GymList from '../components/GymList';

const mapStateToProps = state => {
  return {
    gym: state.gym
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeChildFromGym: child => {
      dispatch(removeChildFromGym(child));
    }
  };
};

const GymListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GymList);

export default GymListContainer;
