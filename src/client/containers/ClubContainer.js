import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import { addClub } from '../actions/clubActions';
import { getSessionClubs } from '../actions/sessionActions';

import ClubList from '../components/Club/ClubList';
import ClubForm from '../components/Club/ClubForm';

function Club(props) {
  useEffect(() => {
    getSessionClubs(props.sessionId);
  }, []);

  if (!props.clubs) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <ClubList clubs={props.clubs} sessions={props.sessions} />
      <ClubForm sessionId={props.sessionId} />
      {/*      <Link to="/club/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue text-white hover:bg-grey-lightest hover:text-blue text-center no-underline border rounded">
          Create Club
        </button>
      </Link>*/}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubs: state.club.clubs,
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
