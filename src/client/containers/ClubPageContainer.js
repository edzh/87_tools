import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setClub,
  getCurrentClub,
  getClubStudents
} from '../actions/clubActions';
import { fetchSessions } from '../actions/sessionActions';

import MainDetailsHeader from '../components/Details/MainDetailsHeader';
import ClubDetails from '../components/Club/ClubDetails';
import ClubStudentList from '../components/Club/ClubStudentList';

function ClubPage(props) {
  const [editDetails, setEditDetails] = useState(false);

  useEffect(() => {
    props.getCurrentClub(props.clubId);
    props.fetchSessions();
  }, []);

  // useEffect(() => {
  //   props.getClubStudents(props.clubId);
  // }, []);

  if (!props.currentClub.item) return null;

  return (
    <div>
      <MainDetailsHeader>{props.currentClub.item.name}</MainDetailsHeader>

      {/*      <ClubDetails
        club={props.currentClub}
        sessions={props.sessions}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />*/}
      {/*<ClubStudentList students={props.currentClub.item} />*/}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubId: ownProps.match.params.id,
    currentClub: state.club.currentClub,
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
