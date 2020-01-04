import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { setFamily, getCurrentFamily } from '../../actions/familyActions';

import FamilyDetails from '../../components/Family/FamilyDetails';
import FamilyPins from '../../components/Family/FamilyPins';
import FamilyDeleteModal from '../../components/Family/FamilyDeleteModal';

function FamilyPage({ familyId, getCurrentFamily, setFamily }) {
  const [fetchedFamily, setFetchedFamily] = useState('');
  const [editDetails, setEditDetails] = useState(false);
  const [editPickups, setEditPickups] = useState(false);
  const [toFamily, setToFamily] = useState(false);

  useEffect(() => {
    setFamily(familyId);
    getCurrentFamily(familyId);

    const fetchFamily = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/api/family/${familyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamily(result);
    };

    fetchFamily();
  }, [editDetails]);

  const removeFamily = async familyId => {
    try {
      const family = await fetch(
        `${process.env.REACT_APP_API_URL}/api/family/${familyId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      ).then(() => {
        setToFamily(true);
      });
    } catch (e) {
      return Promise.reject();
    }
  };

  if (toFamily === true) {
    return <Redirect to={`/program/${fetchedFamily.program}/families`} />;
  }

  return (
    <div>
      <FamilyDetails
        family={fetchedFamily}
        familyId={familyId}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />
      <FamilyPins
        family={fetchedFamily}
        editPickups={editPickups}
        setEditPickups={setEditPickups}
      />
      <FamilyDeleteModal family={fetchedFamily} removeFamily={removeFamily} />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    familyId: ownProps.match.params.id,
    currentFamily: state.currentFamily
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFamily: family => {
      dispatch(setFamily(family));
    },
    getCurrentFamily: familyId => {
      dispatch(getCurrentFamily(familyId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyPage);
