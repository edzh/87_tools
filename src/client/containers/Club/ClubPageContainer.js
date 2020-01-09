import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getCurrentClub, updateCurrentClub } from '../../actions/clubActions';

import { getStudentsByClub } from '../../actions/studentActions';

import { getSessionsByProgram } from '../../actions/sessionActions';

import MainDetailsHeader from '../../components/Details/MainDetailsHeader';
import ClubDetails from '../../components/Club/ClubDetails';
import ClubStudentList from '../../components/Club/ClubStudentList';

function ClubPage({
  getCurrentClub,
  getStudentsByClub,
  getSessionsByProgram,
  currentClub,
  clubId,
  students,
  sessions,
  updateCurrentClub,
  user
}) {
  const [editDetails, setEditDetails] = useState(false);
  useEffect(() => {
    getCurrentClub(clubId);
    getStudentsByClub(clubId);
  }, []);

  useEffect(() => {
    user.currentProgram && getSessionsByProgram(user.currentProgram);
  }, [user.currentProgram]);

  if (!currentClub.item.allIds) return null;

  return (
    <div>
      <MainDetailsHeader>
        {currentClub.item.byId[currentClub.item.allIds].name}
      </MainDetailsHeader>

      {
        <ClubDetails
          currentClub={currentClub.item}
          sessions={sessions.items}
          students={students.items}
          editDetails={editDetails}
          setEditDetails={setEditDetails}
          updateCurrentClub={updateCurrentClub}
        />
      }
      {<ClubStudentList students={students.items} />}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    clubId: ownProps.match.params.id,
    currentClub: state.currentClub,
    students: state.students,
    sessions: state.sessions,
    user: state.user.item
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
    },
    updateCurrentClub: club => {
      dispatch(updateCurrentClub(club));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubPage);
