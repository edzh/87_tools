import 'cross-fetch';

import * as types from './studentTypes';

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
    return fetch(`http://localhost:3001/api/student`)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchStudentsSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchStudentsFailure());
      });
  };
}
