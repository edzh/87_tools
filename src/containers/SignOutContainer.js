import React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../actions/userActions';

function SignOut(props) {
  function handleSubmit() {
    props.signOut();
  }

  return <button onClick={handleSubmit}>Sign Out</button>;
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};

const SignOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOut);

export default SignOutContainer;
