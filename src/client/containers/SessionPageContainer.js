import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setSession,
  getCurrentSession,
  getCurrentSessionClubs
} from '../actions/sessionActions';

import SessionDetails from '../components/Session/SessionDetails';

function SessionPage(props) {
  useEffect(() => {
    props.getCurrentSession(props.sessionId);
    props.getCurrentSessionClubs(props.sessionId);
  }, []);

  if (!props.session) return null;

  return (
    <div>
      <SessionDetails session={props.session} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionId: ownProps.match.params.id,
    session: state.session.currentSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getCurrentSessionClubs: sessionId => {
      dispatch(getCurrentSessionClubs(sessionId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionPage);
