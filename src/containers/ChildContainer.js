import { connect } from 'react-redux';

import { addChildToLibrary } from '../actions/postcareLocationsActions';

import Child from '../components/Child';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addChildToLibrary: child => {
      dispatch(addChildToLibrary(child));
    }
  };
};

const ChildContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Child);

export default ChildContainer;
