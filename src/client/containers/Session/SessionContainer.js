import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProgramSessions } from '../../actions/programActions';
import { addSession } from '../../actions/sessionActions';

import MainDetailsHeader from '../../components/Details/MainDetailsHeader';
import SessionList from '../../components/Session/SessionList';
import SessionForm from '../../components/Session/SessionForm';

function Session(props) {
  useEffect(() => {
    props.getProgramSessions(props.programId);
  }, []);

  return (
    <div>
      <SessionList
        sessions={props.sessions}
        currentProgramSession={props.currentProgramSession}
      />
      <SessionForm programId={props.programId} addSession={props.addSession} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.match.params.id,
    sessions: state.sessions,
    currentProgramSession: state.currentProgram.item.currentSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProgramSessions: programId => {
      dispatch(getProgramSessions(programId));
    },
    addSession: session => {
      dispatch(addSession(session));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
