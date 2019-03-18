import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { setClub } from '../actions/clubActions';
import ClubStudentList from '../components/Club/ClubStudentList';

function ClubPage(props) {
  const [club, setClub] = useState(null);

  useEffect(() => {
    props.setClub(props.club);

    fetch(`http://localhost:3001/api/club/${props.club}`)
      .then(response => response.json())
      .then(json => setClub(json.data));
  }, []);

  if (!club) return null;

  return (
    <div>
      {club.name}
      <ClubStudentList club={club} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    club: ownProps.club
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClub: club => {
      dispatch(setClub(club));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClubPage);
