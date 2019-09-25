import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProgramFamilies } from '../actions/programActions';

import FamilyList from '../components/Family/FamilyList';

function Family(props) {
  useEffect(() => {
    props.getProgramFamilies(props.programId);
  }, []);

  return (
    <div>
      <FamilyList families={props.families} />
      <Link to="/family/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue-500 text-white hover:bg-gray-100 hover:text-blue-500 text-center no-underline border rounded">
          Create Family
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    families: state.families,
    programId: ownProps.match.params.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProgramFamilies: programId => {
      dispatch(getProgramFamilies(programId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
