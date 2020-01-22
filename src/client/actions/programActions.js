import { apiUrl } from 'config';
import { fetchPrograms } from '../api/fetchPrograms';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';

function fetchProgramsRequest() {
  return {
    type: 'FETCH_PROGRAMS_REQUEST'
  };
}

function fetchProgramsSuccess(programs) {
  const normalizedPrograms = normalize(programs, schema.programList);

  return {
    type: 'FETCH_PROGRAMS_SUCCESS',
    payload: {
      byId: normalizedPrograms.entities.program,
      allIds: normalizedPrograms.result
    }
  };
}

function fetchProgramsFailure(err) {
  return {
    type: 'FETCH_PROGRAMS_FAILURE',
    err
  };
}

export function fetchUserPrograms() {
  return dispatch => {
    dispatch(fetchProgramsRequest());
    return fetchPrograms.get
      .user()
      .then(data => dispatch(fetchProgramsSuccess(data)));
  };
}

/* Current Program Actions */
/* REQUEST */
function currentProgramRequest() {
  return {
    type: 'CURRENT_PROGRAM_REQUEST'
  };
}

/* SUCCESS */

function currentProgramSuccess(program) {
  const normalizedProgram = normalize(program, schema.program);

  return {
    type: 'CURRENT_PROGRAM_SUCCESS',
    payload: {
      byId: normalizedProgram.entities.program,
      allIds: normalizedProgram.result
    }
  };
}

function addProgramSuccess(program) {
  const normalizedProgram = normalize(program, schema.program);

  return {
    type: 'ADD_PROGRAM_SUCCESS',
    payload: {
      byId: normalizedProgram.entities.program,
      allIds: normalizedProgram.result
    }
  };
}

function getProgramFamiliesSuccess(families) {
  return {
    type: 'GET_PROGRAM_FAMILIES_SUCCESS',
    families
  };
}

export function getCurrentProgram(programId) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetchPrograms.get
      .one(programId)
      .then(data => dispatch(currentProgramSuccess(data)));
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

export function addProgram(program) {
  return dispatch => {
    dispatch(fetchProgramsRequest());
    return fetchPrograms
      .add(program)
      .then(data => dispatch(addProgramSuccess(data)));
  };
}

export function updateCurrentProgram(program) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetchPrograms
      .update(program)
      .then(data => dispatch(currentProgramSuccess(data)));
  };
}

export function deleteCurrentProgram(programId) {
  return dispatch => {
    dispatch(fetchProgramsRequest());
    return fetchPrograms
      .delete(programId)
      .then(data => dispatch(deleteProgramSuccess(data)));
  };
}

function deleteProgramSuccess(program) {
  const normalizedProgram = normalize(program, schema.program);

  return {
    type: 'DELETE_PROGRAM_SUCCESS',
    payload: {
      byId: normalizedProgram.entities.program,
      allIds: normalizedProgram.result
    }
  };
}
