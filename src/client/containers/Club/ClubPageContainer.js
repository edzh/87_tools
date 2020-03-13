import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';

import { getCurrentClub, updateCurrentClub } from '../../actions/clubActions';
import { getStudentsByClub } from '../../actions/studentActions';

import { getSessionsByProgram } from '../../actions/sessionActions';

import ClubDetails from '../../components/Club/ClubDetails';
import ClubStudentList from '../../components/Club/ClubStudentList';

function ClubPage({
  getCurrentClub,
  getStudentsByClub,
  getSessionsByProgram,
  currentClub,
  clubId,
  routes,
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
      {routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
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
