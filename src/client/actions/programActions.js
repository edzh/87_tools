import { apiUrl } from 'config';
import { fetchStudents } from '../api';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';

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

/* Current Program Actions */
/* REQUEST */
function currentProgramRequest() {
  return {
    type: 'CURRENT_PROGRAM_REQUEST'
  };
}

/* SUCCESS */

function currentProgramSuccess(program) {
  return {
    type: 'CURRENT_PROGRAM_SUCCESS',
    program
  };
}

function addProgramSuccess(program) {
  return {
    type: 'ADD_PROGRAM_SUCCESS',
    program
  };
}

function getProgramSessionsSuccess(sessions) {
  return {
    type: 'GET_PROGRAM_SESSIONS_SUCCESS',
    sessions
  };
}

function getProgramStudentsSuccess(students) {
  return {
    type: 'GET_PROGRAM_STUDENTS_SUCCESS',
    students: normalize(students, schema.studentList)
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

export function getProgramStudents(programId) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetchStudents.get
      .program(programId)
      .then(data => dispatch(getProgramStudentsSuccess(data)));
  };
}

export function addProgram(program) {
  return dispatch => {
    dispatch(fetchProgramsRequest());
    return fetch(`${apiUrl}/api/program/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(program)
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create program!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addProgramSuccess(json.data));
      });
  };
}

export function getProgramFamilies(programId) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetch(`${apiUrl}/api/program/${programId}/families`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getProgramFamiliesSuccess(json.data));
      });
  };
}

export function updateCurrentProgram(program) {
  return dispatch => {
    dispatch(currentProgramRequest());
    return fetch(`${apiUrl}/api/program/${program._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(program)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(currentProgramSuccess(json.data));
      });
  };
}
