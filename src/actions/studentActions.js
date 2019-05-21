import 'cross-fetch';

import * as types from './studentTypes';
import config from 'config';

function fetchStudentsRequest() {
  return {
    type: types.FETCH_STUDENTS_REQUEST
  };
}

function fetchStudentsSuccess(students) {
  return {
    type: types.FETCH_STUDENTS_SUCCESS,
    students
  };
}

function fetchStudentsFailure() {
  return {
    type: types.FETCH_STUDENTS_FAILURE
  };
}

export function fetchStudents() {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetch(`${config.apiUrl}/api/student`, {
      headers: {
        Authorization: `Bearer ${config.token}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchStudentsSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchStudentsFailure());
      });
  };
}

export function setStudent(student) {
  return {
    type: types.SET_STUDENT,
    student
  };
}
