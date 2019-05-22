import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import { fetchClubs } from '../actions/clubActions';
import ClubList from '../components/Club/ClubList';

function Club(props) {
  useEffect(() => {
    props.fetchClubs();
  }, []);

  if (!props.clubs) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <ClubList clubs={props.clubs} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClubs: () => {
      dispatch(fetchClubs());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Club);
