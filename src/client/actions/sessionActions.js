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
