import 'cross-fetch';
import { apiUrl } from 'config';

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

function fetchStudentsFailure(error) {
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

export function addStudent(student) {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetch(`${apiUrl}/api/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(student)
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create student!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addStudentSuccess(json.data));
      })
      .catch(err => {
        dispatch(studentError(err));
      });
  };
}

function addStudentSuccess(student) {
  return {
    type: 'ADD_STUDENT_SUCCESS',
    student
  };
}

export function studentError(error) {
  return {
    type: 'STUDENT_ERROR',
    error
  };
}

function currentStudentRequest() {
  return {
    type: 'CURRENT_STUDENT_REQUEST'
  };
}

function currentStudentSuccess(student) {
  return {
    type: 'CURRENT_STUDENT_SUCCESS',
    student
  };
}

export function getCurrentStudent(studentId) {
  return dispatch => {
    dispatch(currentStudentRequest());
    return fetch(`${apiUrl}/api/student/${studentId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.data);
        dispatch(currentStudentSuccess(json.data));
      });
    // .catch(err => dispatch(currentStudentFailure()))
  };
}

export function updateCurrentStudent(student) {
  return dispatch => {
    dispatch(currentStudentRequest());
    return fetch(`${apiUrl}/api/student/${student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(student)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(currentStudentSuccess(json.data));
      });
    // .catch(err => dispatch(currentStudentFailure()))
  };
}
