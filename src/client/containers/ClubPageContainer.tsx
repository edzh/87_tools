import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { setClub } from '../actions/clubActions';
import ClubDetails from '../components/Club/ClubDetails';
import ClubStudentList from '../components/Club/ClubStudentList';

function ClubPage(props) {
  const [club, setClub] = useState(null);
  const [editDetails, setEditDetails] = useState(false);

  useEffect(() => {
    props.setClub(props.club);

    fetch(`${process.env.REACT_APP_API_URL}/api/club/${props.club}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => setClub(json.data));
  }, [editDetails]);

  if (!club) return null;

  return (
    <div>
      <ClubDetails
        club={club}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />
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
