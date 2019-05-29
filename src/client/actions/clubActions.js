import * as types from './clubTypes';
import { apiUrl } from 'config';

function fetchClubsRequest() {
  return {
    type: types.FETCH_CLUBS_REQUEST
  };
}

function fetchClubsSuccess(clubs) {
  return {
    type: types.FETCH_CLUBS_SUCCESS,
    clubs
  };
}

function fetchClubsFailure(err) {
  return {
    type: types.FETCH_CLUBS_FAILURE,
    err
  };
}

export function fetchClubs() {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/club`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchClubsSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchClubsFailure(err));
      });
  };
}

export function setClub(club) {
  return {
    type: types.SET_CLUB,
    club
  };
}
