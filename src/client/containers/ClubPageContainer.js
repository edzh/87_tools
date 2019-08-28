import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setClub,
  getCurrentClub,
  getClubStudents
} from '../actions/clubActions';
import { fetchSessions } from '../actions/sessionActions';
import ClubDetails from '../components/Club/ClubDetails';
import ClubStudentList from '../components/Club/ClubStudentList';

function ClubPage(props) {
  const [editDetails, setEditDetails] = useState(false);

  useEffect(() => {
    props.getCurrentClub(props.clubId);
    props.fetchSessions();
  }, []);

  useEffect(() => {
    props.getClubStudents(props.clubId);
  }, [props.club.isFetching]);

  if (!props.club) return null;

  return (
    <div>
      <ClubDetails
        club={props.club.currentClub}
        sessions={props.sessions}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />
      <ClubStudentList students={props.club.currentClub.students} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubId: ownProps.match.params.id,
    club: state.club,
    sessions: state.session.sessions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSessions: () => {
      dispatch(fetchSessions());
    },
    getCurrentClub: clubId => {
      dispatch(getCurrentClub(clubId));
    },
    getClubStudents: clubId => {
      dispatch(getClubStudents(clubId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClubPage);
