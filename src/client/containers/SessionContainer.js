import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSessions } from '../actions/sessionActions';

import SessionList from '../components/Session/SessionList';
import SessionForm from '../components/Session/SessionForm';

function Session(props) {
  useEffect(() => {
    props.fetchSessions();
  }, []);

  return (
    <div>
      <SessionList isFetching={props.isFetching} sessions={props.sessions} />
      <Link to="/session/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue text-white hover:bg-grey-lightest hover:text-blue text-center no-underline border rounded">
          Create Session
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.session.isFetching,
    sessions: state.session.sessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSessions: () => {
      dispatch(fetchSessions());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
