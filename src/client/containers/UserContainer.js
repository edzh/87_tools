import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  fetchUserInfo,
  signInSuccess,
  signInFailure
} from '../actions/userActions';

import { getCurrentProgram } from '../actions/programActions';

function UserContainer(props) {
  useEffect(() => {
    props.fetchUserInfo(localStorage.getItem('id_token'));
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
    fetchUserInfo: token => {
      dispatch(fetchUserInfo(signInSuccess, signInFailure, token));
    },
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
