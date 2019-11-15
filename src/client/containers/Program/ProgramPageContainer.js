import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';

import { getCurrentProgram } from '../../actions/programActions';
import { getCurrentSession } from '../../actions/sessionActions';

import ProgramDetails from '../../components/Program/ProgramDetails';
import ProgramHeader from '../../components/Program/ProgramHeader';
import Dashboard from '../Program/Dashboard';

function ProgramPage(props) {
  useEffect(() => {
    props.getCurrentProgram(props.programId);
  }, []);

  useEffect(() => {
    props.currentSessionId && props.getCurrentSession(props.currentSessionId);
  }, [props.currentSessionId]);

  if (!props.currentProgram) return null;

  return (
    <div>
      <ProgramHeader
        programId={props.programId}
        currentProgram={props.currentProgram}
      />
      <div className="flex">
        <Dashboard programId={props.programId} />
        {props.currentSession.item && (
          <Link
            className="btn m-2 hover:bg-blue-400"
            to={`/session/${props.currentSession.item._id}/timesheets`}
          >
            {props.currentSession.item.name} Timestamps
          </Link>
        )}
      </div>
      {props.routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    currentProgram: state.currentProgram,
    currentSessionId: state.currentProgram.item.currentSession,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramPage);
