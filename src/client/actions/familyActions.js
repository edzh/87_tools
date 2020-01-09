import 'cross-fetch';
import { apiUrl } from 'config';
import { fetchFamilies } from '../api/fetchFamilies';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';

function fetchFamiliesRequest() {
  return {
    type: 'FETCH_FAMILIES_REQUEST'
  };
}

function fetchFamiliesSuccess(families) {
  const normalizedFamilies = normalize(families, schema.familyList);

  return {
    type: 'FETCH_FAMILIES_SUCCESS',
    payload: {
      byId: normalizedFamilies.entities.families,
      allIds: normalizedFamilies.result
    }
  };
}

function fetchFamiliesFailure() {
  return {
    type: 'FETCH_FAMILIES_FAILURE'
  };
}

export function setFamily(family) {
  return {
    type: 'SET_FAMILY',
    family
  };
}

function addFamilySuccess(family) {
  const normalizedFamily = normalize(family, schema.family);

  return {
    type: 'ADD_FAMILY_SUCCESS',
    payload: {
      byId: normalizedFamily.entities.sessions,
      allIds: normalizedFamily.result
    }
  };
}

export function addFamily(family) {
  return dispatch => {
    dispatch(fetchFamiliesRequest());
    return fetchFamilies
      .add(family)
      .then(data => dispatch(addFamilySuccess(data)));
  };
}

export function updateCurrentFamily(family) {
  return dispatch => {
    dispatch(currentFamilyRequest());
    return fetchFamilies
      .update(family)
      .then(data => dispatch(currentFamilySuccess(data)));
  };
}

function currentFamilyRequest() {
  return {
    type: 'CURRENT_FAMILY_REQUEST'
  };
}

export function getCurrentFamily(familyId) {
  return dispatch => {
    dispatch(currentFamilyRequest());
    return fetchFamilies.get
      .one(familyId)
      .then(data => dispatch(currentFamilySuccess(data)));
  };
}

function currentFamilySuccess(family) {
  const normalizedFamily = normalize(family, schema.family);

  return {
    type: 'CURRENT_FAMILY_SUCCESS',
    payload: {
      byId: normalizedFamily.entities.families,
      allIds: normalizedFamily.result
    }
  };
}

export function getFamiliesByProgram(programId) {
  return dispatch => {
    dispatch(fetchFamiliesRequest());
    return fetchFamilies.get
      .program(programId)
      .then(data => dispatch(fetchFamiliesSuccess(data)));
  };
}

export function deleteCurrentFamily(familyId) {
  return dispatch => {
    dispatch(fetchFamiliesRequest());
    return fetchFamilies
      .delete(familyId)
      .then(data => dispatch(deleteFamilySuccess(data)));
  };
}

function deleteFamilySuccess(family) {
  const normalizedFamily = normalize(family, schema.family);

  return {
    type: 'DELETE_FAMILY_SUCCESS',
    payload: {
      byId: normalizedFamily.entities.families,
      allIds: normalizedFamily.result
    }
  };
}
