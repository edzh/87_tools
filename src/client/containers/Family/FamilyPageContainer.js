import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import {
  getCurrentFamily,
  deleteCurrentFamily,
  updateCurrentFamily
} from '../../actions/familyActions';
import { getStudentsByFamily } from '../../actions/studentActions';

import FamilyDetails from '../../components/Family/FamilyDetails';
import FamilyPins from '../../components/Family/FamilyPins';
import FamilyDeleteModal from '../../components/Family/FamilyDeleteModal';

function FamilyPage({
  currentFamily,
  familyId,
  students,
  getCurrentFamily,
  deleteCurrentFamily,
  getStudentsByFamily,
  updateCurrentFamily
}) {
  const [fetchedFamily, setFetchedFamily] = useState('');
  const [editDetails, setEditDetails] = useState(false);
  const [editPickups, setEditPickups] = useState(false);
  const [toFamily, setToFamily] = useState(false);

  useEffect(() => {
    getCurrentFamily(familyId);
    getStudentsByFamily(familyId);
  }, []);

  if (toFamily === true) {
    return <Redirect to={`/program/${fetchedFamily.program}/families`} />;
  }

  return (
    <div>
      <FamilyDetails
        currentFamily={currentFamily.item}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        students={students.items}
      />
      <FamilyPins
        currentFamily={currentFamily.item}
        editPickups={editPickups}
        setEditPickups={setEditPickups}
        updateCurrentFamily={updateCurrentFamily}
      />
      <FamilyDeleteModal
        family={fetchedFamily}
        deleteCurrentFamily={deleteCurrentFamily}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    familyId: ownProps.match.params.id,
    currentFamily: state.currentFamily,
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentFamily: familyId => {
      dispatch(getCurrentFamily(familyId));
    },
    deleteCurrentFamily: familyId => {
      dispatch(deleteCurrentFamily(familyId));
    },
    getStudentsByFamily: familyId => {
      dispatch(getStudentsByFamily(familyId));
    },
    updateCurrentFamily: family => {
      dispatch(updateCurrentFamily(family));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyPage);
