import React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../actions/userActions';

function SignOut(props) {
  function handleSubmit() {
    props.signOut();
  }

  return (
    <button
      className="py-2 no-underline text-blue-500 hover:text-blue-200 text-sm"
      onClick={handleSubmit}
    >
      Sign Out
    </button>
  );
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
