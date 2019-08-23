import { apiUrl } from 'config';

function fetchProgramsRequest() {
  return {
    type: 'FETCH_PROGRAMS_REQUEST'
  };
}

function fetchProgramsSuccess(programs) {
  return {
    type: 'FETCH_PROGRAMS_SUCCESS',
    programs
  };
}

function fetchProgramsFailure(err) {
  return {
    type: 'FETCH_PROGRAMS_FAILURE',
    err
  };
}

export function fetchPrograms() {
  return dispatch => {
    dispatch(fetchProgramsRequest());
    return fetch(`${apiUrl}/api/program`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchProgramsSuccess(json.data));
      });
  };
}

function currentProgramRequest() {
  return {
    type: 'CURRENT_PROGRAM_REQUEST'
  };
}

function currentProgramSuccess(program) {
  return {
    type: 'CURRENT_PROGRAM_SUCCESS',
    program
  };
}

function getProgramSessionsSuccess(sessions) {
  return {
    type: 'GET_PROGRAM_SESSIONS_SUCCESS',
    sessions
  };
}

export function getCurrentProgram(programId) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetch(`${apiUrl}/api/program/${programId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(currentProgramSuccess(json.data));
      });
  };
}

export function setCurrentSession(programId, sessionId) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetch(`${apiUrl}/api/program/${programId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({ currentProgram: sessionId })
    })
      .then(response => response.json())
      .then(json => {
        dispatch(currentProgramSuccess(json.data));
      });
  };
}

export function getProgramSessions(programId) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetch(`${apiUrl}/api/program/${programId}/sessions`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getProgramSessionsSuccess(json.data));
      });
  };
}
