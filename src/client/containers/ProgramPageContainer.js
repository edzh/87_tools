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

  // useEffect(() => {
  //   props.setProgram(props.program);

  //   fetch(`${process.env.REACT_APP_API_URL}/api/program/${props.program}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('id_token')}`
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(json => setProgram(json.data));
  // }, [editDetails]);

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
