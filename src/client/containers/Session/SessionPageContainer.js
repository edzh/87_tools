import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';
import {
  setSession,
  getCurrentSession,
  getSessionClubs,
  addCurrentSessionClub
} from '../../actions/sessionActions';

import MainDetailsHeader from '../../components/Details/MainDetailsHeader';
import SessionDetails from '../../components/Session/SessionDetails';
import SessionHeader from '../../components/Session/SessionHeader';

function SessionPage(props) {
  useEffect(() => {
    props.getCurrentSession(props.sessionId);
    props.getSessionClubs(props.sessionId);
  }, []);

  if (!props.session) return null;

  return (
    <div>
      <SessionHeader sessionId={props.sessionId} />
      {props.routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
      {/*<SessionDetails {...props} session={props.session} />*/}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionId: ownProps.match.params.id,
    session: state.currentSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    },
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    },
    addCurrentSessionClub: (sessionId, club) => {
      dispatch(addCurrentSessionClub(sessionId, club));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionPage);
