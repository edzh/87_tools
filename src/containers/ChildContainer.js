import { connect } from 'react-redux';

import { addChildToLibrary } from '../actions/postcareLocationsActions';
import { addChildToGym } from '../actions/postcareLocationsActions';

import Child from '../components/Children/Child';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addChildToLibrary: child => {
      dispatch(addChildToLibrary(child));
    },
    addChildToGym: child => {
      dispatch(addChildToGym(child));
    }
  };
};

const ChildContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Child);

export default ChildContainer;
