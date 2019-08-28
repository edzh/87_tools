import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RouteWithSubroutes from '../components/Route/RouteWithSubroutes';

import {
  setProgram,
  getCurrentProgram,
  getProgramSessions,
  getProgramStudents
} from '../actions/programActions';

import { addSession } from '../actions/sessionActions';

import ProgramDetails from '../components/Program/ProgramDetails';
import ProgramHeader from '../components/Program/ProgramHeader';
import SessionForm from '../components/Session/SessionForm';

function ProgramPage(props) {
  useEffect(() => {
    props.getCurrentProgram(props.programId);
    props.getProgramSessions(props.programId);
    props.getProgramStudents(props.programId);
  }, []);

  if (!props.program) return null;

  console.log(props.routes);

  return (
    <div>
      <ProgramHeader programId={props.programId} />
      <ProgramDetails
        program={props.program}
        sessions={props.sessions}
        students={props.students}
      />
      {props.routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
      <SessionForm addSession={props.addSession} program={props.program} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    program: state.program.currentProgram,
    sessions: state.session.sessions,
    students: state.program.currentProgram.students
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentProgram: programId => {
      dispatch(getCurrentProgram(programId));
    },
    getProgramSessions: programId => {
      dispatch(getProgramSessions(programId));
    },
    getProgramStudents: programId => {
      dispatch(getProgramStudents(programId));
    },
    addSession: session => {
      dispatch(addSession(session));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramPage);
