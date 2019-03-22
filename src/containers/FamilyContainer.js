import React, { useEffect } from 'react';
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
      <FamilyForm />
      <FamilyList isFetching={props.isFetching} families={props.families} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.family.isFetching,
    families: state.family.families
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
