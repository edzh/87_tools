import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProgramFamilies } from '../../actions/programActions';

import FamilyList from '../../components/Family/FamilyList';
import FamilyForm from '../../components/Family/FamilyForm';

function Family(props) {
  useEffect(() => {
    props.getProgramFamilies(props.programId);
  }, []);

  return (
    <div>
      <FamilyList families={props.families} />
      <FamilyForm programId={props.programId} />
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
