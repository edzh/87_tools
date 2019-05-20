import { connect } from 'react-redux';

import { signIn } from '../actions/userActions';

import SignIn from '../components/Auth/SignIn';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => {
      dispatch(signIn(email, password));
    }
  };
};

const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInContainer;
