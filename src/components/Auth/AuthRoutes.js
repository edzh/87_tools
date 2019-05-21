import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function withAuth(props) {
  if (!props.isAuthenticated) {
    return <Redirect to={'/signin'} />;
  }

  return props.children;
}

export default connect(state => {
  return { isAuthenticated: state.user.isAuthenticated };
})(withAuth);
