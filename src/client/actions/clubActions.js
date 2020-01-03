import { apiUrl } from 'config';
import { fetchClubs } from '../api';
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

function getClubsFailure(err) {
  return {
    type: 'GET_CLUBS_FAILURE',
    err
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
    return fetch(`${apiUrl}/api/club/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(club)
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create club!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addClubSuccess(json.data));
      });
  };
}

function addClubSuccess(club) {
  return {
    type: 'ADD_CLUB_SUCCESS',
    club
  };
}

// update one
export function updateClub(club) {
  return dispatch => {
    dispatch(fetchCurrentClubRequest());
    return fetch(`${apiUrl}/api/club/${club._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(club)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(updateClubSuccess(club));
      });
  };
}

function updateClubSuccess(club) {
  return {
    type: 'UPDATE_CLUB_SUCCESS',
    club
  };
}

// delete one
export function deleteClub(clubId) {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetch(`${apiUrl}/api/club/${clubId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(deleteClubSuccess(clubId));
      });
  };
}

function deleteClubSuccess(clubId) {
  return {
    type: 'DELETE_CLUB_SUCCESS',
    clubId
  };
}

function getClubStudentsSuccess(students) {
  return {
    type: 'GET_CLUB_STUDENTS_SUCCESS',
    students
  };
}
