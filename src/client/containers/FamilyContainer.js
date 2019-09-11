import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchFamilies } from '../actions/familyActions';

import FamilyList from '../components/Family/FamilyList';
import FamilyForm from '../components/Family/FamilyForm';

function Family(props) {
  useEffect(() => {
    props.fetchFamilies();
  }, []);

  return (
    <div>
      <FamilyList isFetching={props.isFetching} families={props.families} />
      <Link to="/family/new">
        <button className="p-2 my-2 w-full text-xl shadow bg-blue text-white hover:bg-grey-lightest hover:text-blue text-center no-underline border rounded">
          Create Family
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.family.family.isFetching,
    families: state.family.family.families
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFamilies: () => {
      dispatch(fetchFamilies());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
