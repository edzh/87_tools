import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getFamiliesByProgram } from '../../actions/familyActions';

import FamilyList from '../../components/Family/FamilyList';
import FamilyForm from '../../components/Family/FamilyForm';

function Family({ getFamiliesByProgram, families, programId }) {
  useEffect(() => {
    getFamiliesByProgram(programId);
  }, []);

  return (
    <div>
      <FamilyList families={families.items} />
      <FamilyForm programId={programId} />
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
    getFamiliesByProgram: programId => {
      dispatch(getFamiliesByProgram(programId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Family);
