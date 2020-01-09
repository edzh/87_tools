import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUser, signInSuccess, signInFailure } from '../actions/userActions';

import Navbar from '../components/Navbar/Navbar';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.item,
    isFetching: state.user.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: token => {
      dispatch(getUser(signInSuccess, signInFailure, token));
    }
  };
};

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default withRouter(NavbarContainer);
