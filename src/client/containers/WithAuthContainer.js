import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function WithAuth(props) {
  if (!props.isAuthenticated) {
    return <Redirect to={'/signin'} />;
  }

  return props.children;
}

const mapStateToProps = state => {
  return { isAuthenticated: state.user.isAuthenticated };
};

export default connect(mapStateToProps)(WithAuth);
