import { apiUrl } from 'config';
import { fetchSessions } from '../api';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';
import * as types from './sessionTypes';

function fetchSessionsRequest() {
  return {
    type: types.FETCH_SESSIONS_REQUEST
  };
}

function fetchSessionsSuccess(sessions) {
  return {
    type: types.FETCH_SESSIONS_SUCCESS,
    sessions
  };
}

function fetchSessionsFailure(err) {
  return {
    type: types.FETCH_SESSIONS_FAILURE,
    err
  };
}

export function fetchSessions() {
  return dispatch => {
    dispatch(fetchSessionsRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/session`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchSessionsSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchSessionsFailure(err));
      });
  };
}

export function setSession(session) {
  return {
    type: types.SET_SESSION,
    session
  };
}

function currentSessionRequest() {
  return {
    type: 'CURRENT_SESSION_REQUEST'
  };
}

function currentSessionSuccess(session) {
  return {
    type: 'CURRENT_SESSION_SUCCESS',
    session
  };
}

function getSessionClubsSuccess(clubs) {
  return {
    type: 'GET_SESSION_CLUBS_SUCCESS',
    clubs
  };
}

function addSessionClubsSuccess(clubs) {
  return {
    type: 'ADD_CURRENT_SESSION_CLUBS_SUCCESS',
    clubs
  };
}

export function getCurrentSession(sessionId) {
  return dispatch => {
    dispatch(currentSessionRequest());
    return fetch(`${apiUrl}/api/session/${sessionId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(currentSessionSuccess(json.data));
      });
  };
}

export function getSessionClubs(sessionId) {
  return dispatch => {
    dispatch(currentSessionRequest());
    return fetch(`${apiUrl}/api/session/${sessionId}/clubs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getSessionClubsSuccess(json.data));
      });
  };
}

function addSessionSuccess(session) {
  return {
    type: 'ADD_SESSION_SUCCESS',
    session
  };
}

export function addSession(session) {
  return dispatch => {
    dispatch(fetchSessionsRequest());
    return fetch(`${apiUrl}/api/session/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(session)
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create session!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addSessionSuccess(json.data));
      });
  };
}

export function addCurrentSessionClub(club) {
  return dispatch => {
    dispatch(fetchSessionsRequest());
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
        dispatch(addSessionClubsSuccess(json.data));
      });
  };
}

function getSessionTimesheetsSuccess(timesheets) {
  return {
    type: 'GET_SESSION_TIMESHEETS_SUCCESS',
    timesheets
  };
}

export function getSessionTimesheets(sessionId) {
  return dispatch => {
    dispatch(currentSessionRequest());
    return fetch(`${apiUrl}/api/session/${sessionId}/timesheets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getSessionTimesheetsSuccess(json.data));
      });
  };
}
