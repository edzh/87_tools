import { apiUrl } from 'config';
import { fetchClubs } from '../api/fetchClubs';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';

function fetchClubsRequest() {
  return {
    type: 'FETCH_CLUBS_REQUEST'
  };
}

export function fetchCurrentClubRequest() {
  return {
    type: 'FETCH_CURRENT_CLUB_REQUEST'
  };
}

// get many
function fetchClubsSuccess(clubs) {
  const normalizedClubs = normalize(clubs, schema.clubList);

  return {
    type: 'FETCH_CLUBS_SUCCESS',
    payload: {
      byId: normalizedClubs.entities.clubs,
      allIds: normalizedClubs.result
    }
  };
}

export function getClubsBySession(sessionId) {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetchClubs.get
      .session(sessionId)
      .then(data => dispatch(fetchClubsSuccess(data)));
  };
}

// get one
export function getCurrentClub(clubId) {
  return dispatch => {
    dispatch(fetchCurrentClubRequest());
    return fetchClubs.get
      .one(clubId)
      .then(data => dispatch(currentClubSuccess(data)));
  };
}

function currentClubSuccess(club) {
  const normalizedClubs = normalize(club, schema.club);

  return {
    type: 'CURRENT_CLUB_SUCCESS',
    payload: {
      byId: normalizedClubs.entities.clubs,
      allIds: normalizedClubs.result
    }
  };
}

// create one
export function addClub(club) {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetchClubs.add(club).then(data => dispatch(addClubSuccess(data)));
  };
}

function addClubSuccess(club) {
  const normalizedClub = normalize(club, schema.club);

  return {
    type: 'ADD_CLUB_SUCCESS',
    payload: {
      byId: normalizedClub.entities.clubs,
      allIds: normalizedClub.result
    }
  };
}

// update one
export function updateCurrentClub(club) {
  return dispatch => {
    dispatch(fetchCurrentClubRequest());
    return fetchClubs.update(club).then(data => currentClubSuccess(data));
  };
}

// delete one
export function deleteCurrentClub(clubId) {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetchClubs
      .delete(clubId)
      .then(data => dispatch(deleteClubSuccess(data)));
  };
}

function deleteClubSuccess(club) {
  const normalizedClub = normalize(club, schema.club);

  return {
    type: 'DELETE_CLUB_SUCCESS',
    payload: {
      byId: normalizedClub.entities.clubs,
      allIds: normalizedClub.result
    }
  };
}
