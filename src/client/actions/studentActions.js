import 'cross-fetch';
import { apiUrl } from 'config';
import { fetchStudents } from '../api';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';
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

export function setStudent(student) {
  return {
    type: types.SET_STUDENT,
    student
  };
}

export function addStudent(student) {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetchStudents
      .add(student)
      .then(data => {
        dispatch(addStudentSuccess(data));
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
    payload: { student }
  };
}

export function getCurrentStudent(studentId) {
  return dispatch => {
    dispatch(currentStudentRequest());
    return fetchStudents.get.one(studentId).then(data => {
      dispatch(currentStudentSuccess(normalize(data, schema.student)));
    });
  };
}

export function updateCurrentStudent(student) {
  return dispatch => {
    dispatch(currentStudentRequest());
    return fetchStudents.update(student).then(data => {
      dispatch(currentStudentSuccess(data));
    });
  };
}
