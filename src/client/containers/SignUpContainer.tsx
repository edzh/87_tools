import { connect } from 'react-redux';

import { signUp } from '../actions/userActions';

import SignUp from '../components/Auth/SignUp';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password) => {
      dispatch(signUp(email, password));
    }
  };
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUpContainer;
