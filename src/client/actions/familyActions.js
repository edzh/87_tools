import 'cross-fetch';
import * as types from './familyTypes';

function fetchFamiliesRequest() {
  return {
    type: types.FETCH_FAMILIES_REQUEST
  };
}

function fetchFamiliesSuccess(families) {
  return {
    type: types.FETCH_FAMILIES_SUCCESS,
    families
  };
}

function fetchFamiliesFailure() {
  return {
    type: types.FETCH_FAMILIES_FAILURE
  };
}

export function fetchFamilies() {
  return dispatch => {
    console.log(localStorage.getItem('id_token'));

    dispatch(fetchFamiliesRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/family`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchFamiliesSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchFamiliesFailure());
      });
  };
}

export function setFamily(family) {
  return {
    type: types.SET_FAMILY,
    family
  };
}
