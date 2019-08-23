import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setProgram,
  getCurrentProgram,
  getProgramSessions
} from '../actions/programActions';

import ProgramDetails from '../components/Program/ProgramDetails';

function ProgramPage(props) {
  useEffect(() => {
    props.getCurrentProgram(props.programId);
    props.getProgramSessions(props.programId);
  }, []);

  if (!props.program) return null;

  return (
    <div>
      <ProgramDetails program={props.program} />
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
    },
    getProgramSessions: programId => {
      dispatch(getProgramSessions(programId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramPage);
