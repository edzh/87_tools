import { connect } from 'react-redux';

import { removeChildFromLibrary } from '../actions/postcareLocationsActions';

import LibraryList from '../components/LibraryList';

const mapStateToProps = state => {
  return {
    library: state.library
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeChildFromLibrary: child => {
      dispatch(removeChildFromLibrary(child));
    }
  };
};

const LibraryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryList);

export default LibraryListContainer;
