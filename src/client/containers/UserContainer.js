import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser, signInSuccess, signInFailure } from '../actions/userActions';

import { getCurrentProgram } from '../actions/programActions';

function UserContainer(props) {
  useEffect(() => {
    props.user.isAuthenticated && props.getUser();
  }, []);

  return <div>{props.children}</div>;
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: token => {
      dispatch(getUser(signInSuccess, signInFailure, token));
    },
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
