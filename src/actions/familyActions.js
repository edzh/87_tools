import 'cross-fetch';

import * as types from './familyTypes';
import { apiUrl } from 'config';

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
    dispatch(fetchFamiliesRequest());
    return fetch(`${apiUrl}/api/family`)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchFamiliesSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchFamiliesFailure());
      });
  };
}
