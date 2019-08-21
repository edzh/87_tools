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
