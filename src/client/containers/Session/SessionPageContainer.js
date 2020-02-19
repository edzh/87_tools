import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';
import {
  setSession,
  getCurrentSession,
  addCurrentSessionClub
} from '../../actions/sessionActions';
import { getClubsBySession } from '../../actions/clubActions';

import SessionDetails from '../../components/Session/SessionDetails';
import SessionHeader from '../../components/Session/SessionHeader';

function SessionPage(props) {
  useEffect(() => {
    props.getCurrentSession(props.sessionId);
  }, []);

  if (!props.session) return null;

  return (
    <div>
      <SessionHeader sessionId={props.sessionId} session={props.session} />
      {props.routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
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
    getClubsBySession: sessionId => {
      dispatch(getClubsBySession(sessionId));
    },
    addCurrentSessionClub: (sessionId, club) => {
      dispatch(addCurrentSessionClub(sessionId, club));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
