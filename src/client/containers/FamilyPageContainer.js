import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { setFamily } from '../actions/familyActions';

import FamilyDetails from '../components/Family/FamilyDetails';
import FamilyPins from '../components/Family/FamilyPins';

function FamilyPage(props) {
  const [fetchedFamily, setFetchedFamily] = useState('');
  const [editDetails, setEditDetails] = useState(false);
  const [editPickups, setEditPickups] = useState(false);

  useEffect(() => {
    props.setFamily(props.family);

    const fetchFamily = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/api/family/${props.family}`,
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

  return (
    <div>
      <FamilyDetails
        family={fetchedFamily}
        editDetails={editDetails}
        setEditDetails={setEditDetails}
      />
      <FamilyPins
        family={fetchedFamily}
        editPickups={editPickups}
        setEditPickups={setEditPickups}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    family: ownProps.family
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFamily: family => {
      dispatch(setFamily(family));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyPage);