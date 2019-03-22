import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';
import { setFamily } from '../actions/familyActions';

function FamilyPage(props) {
  const [fetchedFamily, setFetchedFamily] = useState('');

  useEffect(() => {
    props.setFamily(props.family);

    const fetchFamily = async () => {
      const result = await fetch(`${apiUrl}/api/family/${props.family}`)
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamily(result);
      console.log(result);
    };

    fetchFamily();
  }, []);

  return (
    <ul>
      <li>{fetchedFamily.name}</li>
      {fetchedFamily.students &&
        fetchedFamily.students.map(student =>
          student ? (
            <ul>
              <li>{student.name}</li>
              <li>{student.grade}</li>
            </ul>
          ) : (
            <p>No student assigned!</p>
          )
        )}
      {fetchedFamily.pickups &&
        fetchedFamily.pickups.map(pickup =>
          pickup ? (
            <ul>
              <li>{pickup.name}</li>
              <li>{pickup.pin}</li>
            </ul>
          ) : (
            <p>No pickups assigned!</p>
          )
        )}
    </ul>
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
