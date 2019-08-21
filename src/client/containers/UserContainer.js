import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  fetchUserInfo,
  signInSuccess,
  signInFailure
} from '../actions/userActions';

function UserContainer(props) {
  useEffect(() => {
    props.fetchUserInfo(localStorage.getItem('id_token'));
  }, []);

  return <div>{props.children}</div>;
}

const mapStateToProps = state => {
  return {
    isFetching: state.user.isFetching,
    user: state.user.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: token => {
      dispatch(fetchUserInfo(signInSuccess, signInFailure, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
