import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <Link to="/club/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue text-white hover:bg-grey-lightest hover:text-blue text-center no-underline border rounded">
          Create Club
        </button>
      </Link>
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
