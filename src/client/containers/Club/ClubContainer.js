import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import { addClub } from '../../actions/clubActions';
import { getSessionClubs } from '../../actions/sessionActions';

import ClubList from '../../components/Club/ClubList';
import ClubForm from '../../components/Club/ClubForm';

function Club(props) {
  useEffect(() => {
    props.getSessionClubs(props.sessionId);
  }, []);

  if (!props.clubs) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ClubList clubs={props.clubs} sessions={props.sessions} />
      <ClubForm addClub={props.addClub} sessionId={props.sessionId} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubs: state.clubs,
    sessionId: ownProps.match.params.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addClub: club => {
      dispatch(addClub(club));
    },
    getSessionClubs: sessionId => {
      dispatch(getSessionClubs(sessionId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Club);
