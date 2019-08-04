import { connect } from 'react-redux';

import { removeStudentFromLibrary } from '../actions/postcareLocationsActions';

import LibraryList from '../components/LibraryList';

const mapStateToProps = state => {
  return {
    library: state.library
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeStudentFromLibrary: student => {
      dispatch(removeStudentFromLibrary(student));
    }
  };
};

const LibraryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryList);

export default LibraryListContainer;
