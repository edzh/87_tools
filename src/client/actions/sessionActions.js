import { apiUrl } from 'config';
import { fetchSessions } from '../api/fetchSessions';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';
import * as types from './sessionTypes';

function fetchSessionsRequest() {
  return {
    type: types.FETCH_SESSIONS_REQUEST
  };
}

function fetchSessionsSuccess(sessions) {
  const normalizedSessions = normalize(sessions, schema.sessionList);

  console.log(sessions);
  return {
    type: types.FETCH_SESSIONS_SUCCESS,
    payload: {
      byId: normalizedSessions.entities.sessions,
      allIds: normalizedSessions.result
    }
  };
}

function fetchSessionsFailure(err) {
  return {
    type: types.FETCH_SESSIONS_FAILURE,
    err
  };
}

export function getSessionsByProgram(programId) {
  return dispatch => {
    dispatch(fetchSessionsRequest());
    return fetchSessions.get.program(programId).then(data => {
      dispatch(fetchSessionsSuccess(data));
      console.log(data);
    });
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

function addSessionClubsSuccess(clubs) {
  return {
    type: 'ADD_CURRENT_SESSION_CLUBS_SUCCESS',
    clubs
  };
}

export function getCurrentSession(sessionId) {
  return dispatch => {
    dispatch(currentSessionRequest());
    return fetchSessions.get
      .one(sessionId)
      .then(data => dispatch(currentSessionSuccess(data)));
  };
}

function addSessionSuccess(session) {
  const normalizedSession = normalize(session, schema.session);

  return {
    type: 'ADD_SESSION_SUCCESS',
    payload: {
      byId: normalizedSession.entities.sessions,
      allIds: normalizedSession.result
    }
  };
}

export function addSession(session) {
  return dispatch => {
    dispatch(fetchSessionsRequest());
    return fetchSessions
      .add(session)
      .then(data => dispatch(addSessionSuccess(data)));
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
