import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { setFamily } from '../actions/familyActions';

import FamilyDetails from '../components/Family/FamilyDetails';

function FamilyPage(props) {
  const [fetchedFamily, setFetchedFamily] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    props.setFamily(props.family);

    const fetchFamily = async () => {
      const result = await fetch(`${apiUrl}/api/family/${props.family}`)
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamily(result);
    };

    fetchFamily();
  }, [edit]);

  return (
    <div>
      <FamilyDetails family={fetchedFamily} edit={edit} setEdit={setEdit} />
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
