import 'cross-fetch';
import { apiUrl } from 'config';
import { fetchStudents } from '../api/fetchStudents';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';
import * as types from './studentTypes';

function fetchStudentsRequest() {
  return {
    type: types.FETCH_STUDENTS_REQUEST
  };
}

function fetchStudentsSuccess(students) {
  const normalizedStudents = normalize(students, schema.studentList);

  return {
    type: types.FETCH_STUDENTS_SUCCESS,
    payload: {
      byId: normalizedStudents.entities.students,
      allIds: normalizedStudents.result
    }
  };
}

function fetchStudentsFailure(error) {
  return {
    type: types.FETCH_STUDENTS_FAILURE
  };
}

export function addStudent(student) {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetchStudents
      .add(student)
      .then(data => dispatch(addStudentSuccess(data)))
      .catch(err => dispatch(studentError(err)));
  };
}

function addStudentSuccess(student) {
  const normalizedStudent = normalize(student, schema.student);

  return {
    type: 'ADD_STUDENT_SUCCESS',
    payload: {
      byId: normalizedStudent.entities.students,
      allIds: normalizedStudent.result
    }
  };
}

function deleteStudentSuccess(student) {
  const normalizedStudent = normalize(student, schema.student);

  return {
    type: 'DELETE_STUDENT_SUCCESS',
    payload: {
      byId: normalizedStudent.entities.students,
      allIds: normalizedStudent.result
    }
  };
}

export function deleteCurrentStudent(studentId) {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetchStudents
      .delete(studentId)
      .then(data => dispatch(deleteStudentSuccess(data)));
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
  const normalizedStudent = normalize(student, schema.student);

  return {
    type: 'CURRENT_STUDENT_SUCCESS',
    payload: {
      byId: normalizedStudent.entities.students,
      allIds: normalizedStudent.result
    }
  };
}

export function getCurrentStudent(studentId) {
  return dispatch => {
    dispatch(currentStudentRequest());
    return fetchStudents.get
      .one(studentId)
      .then(data => dispatch(currentStudentSuccess(data)));
  };
}

export function updateCurrentStudent(student) {
  return dispatch => {
    dispatch(currentStudentRequest());
    return fetchStudents
      .update(student)
      .then(data => dispatch(currentStudentSuccess(data)));
  };
}

export function getStudentsByProgram(programId) {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetchStudents.get
      .program(programId)
      .then(data => dispatch(fetchStudentsSuccess(data)));
  };
}

export function getStudentsByClub(clubId) {
  return dispatch => {
    dispatch(fetchStudentsRequest());
    return fetchStudents.get
      .club(clubId)
      .then(data => dispatch(fetchStudentsSuccess(data)));
  };
}
