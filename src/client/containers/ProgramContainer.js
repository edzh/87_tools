import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPrograms } from '../actions/programActions';

import ProgramList from '../components/Program/ProgramList';

function Program(props) {
  useEffect(() => {
    props.fetchPrograms();
  }, []);

  return (
    <div>
      <ProgramList programs={props.programs} user={props.user} />
      <Link to="/program/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue text-white hover:bg-grey-lightest hover:text-blue text-center no-underline border rounded">
          Create Program
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    programs: state.program.programs,
    user: state.user.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPrograms: () => {
      dispatch(fetchPrograms());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Program);
