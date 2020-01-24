import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link, Switch } from 'react-router-dom';
import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';

import { getCurrentProgram } from '../../actions/programActions';
import { getCurrentSession } from '../../actions/sessionActions';

import ProgramDetails from '../../components/Program/ProgramDetails';
import ProgramHeader from '../../components/Program/ProgramHeader';
import Dashboard from '../Program/Dashboard';

function ProgramPage(props) {
  const sessionId = props.currentProgram.item.allIds
    ? props.currentProgram.item.byId[props.currentProgram.item.allIds]
        .currentSession
    : undefined;
  useEffect(() => {
    props.getCurrentProgram(props.programId);
  }, []);

  useEffect(() => {
    sessionId && props.getCurrentSession(sessionId);
  }, [sessionId]);

  if (!props.currentProgram) return null;

  return (
    <div>
      <ProgramHeader
        programId={props.programId}
        currentProgram={props.currentProgram.item}
      />
      <div className="flex">
        {props.currentSession.item.byId[sessionId] && (
          <Link
            className="btn my-2 hover:bg-blue-400"
            to={`/session/${sessionId}/timesheets`}
          >
            {props.currentSession.item.byId[sessionId].name} Timestamps
          </Link>
        )}
      </div>
      <Switch>
        {props.routes.map(route => (
          <RouteWithSubroutes key={route.path} {...route} />
        ))}
      </Switch>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    currentProgram: state.currentProgram,
    // currentSessionId: state.currentProgram.item.byId[state.currentProgram.item.allIds].currentSession,
    currentSession: state.currentSession
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    },
    getCurrentSession: sessionId => {
      dispatch(getCurrentSession(sessionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgramPage);
