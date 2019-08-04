import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import { setClubs, startSetClubs } from '../actions/clubActions';
import ClubList from '../components/Club/ClubList';
import { Club } from '../types/Club';
import { AppState } from '../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { bindActionCreators } from 'redux';

function ClubContainer(props: any) {
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

interface LinkStateProps {
  clubs: Club[];
}

interface LinkDispatchProps {
  startSetClubs: (club: Club) => void;
}

const mapStateToProps = (state: AppState) => {
  clubs: state.clubs;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => {
  startSetClubs: bindActionCreators(startSetClubs, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClubContainer);
