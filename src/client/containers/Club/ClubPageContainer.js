import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { setClub, getCurrentClub } from '../../actions/clubActions';

import { getStudentsByClub } from '../../actions/studentActions';

import { getSessionsByProgram } from '../../actions/sessionActions';

import MainDetailsHeader from '../../components/Details/MainDetailsHeader';
import ClubDetails from '../../components/Club/ClubDetails';
import ClubStudentList from '../../components/Club/ClubStudentList';

function ClubPage({
  getCurrentClub,
  getStudentsByClub,
  currentClub,
  clubId,
  students,
  sessions
}) {
  const [editDetails, setEditDetails] = useState(false);

  useEffect(() => {
    getCurrentClub(clubId);
  }, []);

  useEffect(() => {
    getStudentsByClub(clubId);
  }, []);

  console.log(currentClub);
  if (!currentClub.item.allIds) return null;

  return (
    <div>
      <MainDetailsHeader>
        {currentClub.item.byId[currentClub.item.allIds].name}
      </MainDetailsHeader>

      {/*      <ClubDetails
        club={currentClub}
        sessions={sessions}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />*/}
      {<ClubStudentList students={students.items} />}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubId: ownProps.match.params.id,
    currentClub: state.currentClub,
    students: state.students,
    sessions: state.sessions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSessionsByProgram: programId => {
      dispatch(getSessionsByProgram(programId));
    },
    getCurrentClub: clubId => {
      dispatch(getCurrentClub(clubId));
    },
    getStudentsByClub: clubId => {
      dispatch(getStudentsByClub(clubId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubPage);
