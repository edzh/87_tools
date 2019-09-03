import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteWithSubroutes from '../components/Route/RouteWithSubroutes';

import { getCurrentProgram } from '../actions/programActions';

import ProgramDetails from '../components/Program/ProgramDetails';
import ProgramHeader from '../components/Program/ProgramHeader';

function ProgramPage(props) {
  useEffect(() => {
    props.getCurrentProgram(props.programId);
  }, []);

  if (!props.program) return null;

  return (
    <div>
      <ProgramHeader programId={props.programId} />
      {props.routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    program: state.program.currentProgram
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramPage);