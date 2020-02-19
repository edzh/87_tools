import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSessionsByProgram } from '../../actions/sessionActions';
import { addSession } from '../../actions/sessionActions';

import SessionList from '../../components/Session/SessionList';
import SessionForm from '../../components/Session/SessionForm';

function Session(props) {
  useEffect(() => {
    props.getSessionsByProgram(props.programId);
  }, []);

  return (
    <div>
      <SessionList
        sessions={props.sessions.items}
        currentProgram={props.currentProgram.item}
      />
      <SessionForm programId={props.programId} addSession={props.addSession} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    sessions: state.sessions,
    currentProgram: state.currentProgram
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSessionsByProgram: programId => {
      dispatch(getSessionsByProgram(programId));
    },
    addSession: session => {
      dispatch(addSession(session));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
