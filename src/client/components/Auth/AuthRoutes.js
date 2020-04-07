import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function withAuth({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Redirect to={'/signin'} />;
  }

  return children;
}

export default connect(state => {
  return { isAuthenticated: state.user.isAuthenticated };
})(withAuth);
