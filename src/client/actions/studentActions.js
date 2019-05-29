import 'cross-fetch';

import * as types from './studentTypes';
import { apiUrl } from 'config';

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
    return fetch(`${process.env.REACT_APP_API_URL}/api/student`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
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
