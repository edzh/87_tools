import { combineReducers } from 'redux';

import * as types from '../actions/studentTypes';

const initialStudentsState = {
  items: [],
  isFetching: false
};

const initialCurrentStudentState = {
  isFetching: false
};

function students(state = initialStudentsState, action) {
  switch (action.type) {
    case types.FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    // case types.FETCH_STUDENTS_SUCCESS:
    case 'GET_PROGRAM_STUDENTS_SUCCESS':
      return {
        ...state,
        items: action.students,
        isFetching: false
      };
    case types.FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.SET_STUDENT:
      return {
        ...state,
        id: action.student
      };
    case 'ADD_STUDENT_SUCCESS':
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }

      return {
        ...state,
        items: [action.student, ...state.items].sort(compare),
        recentStudent: action.student,
        isFetching: false
      };
    case 'STUDENT_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

function currentStudent(state = initialCurrentStudentState, action) {
  switch (action.type) {
    case 'CURRENT_STUDENT_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_STUDENT_SUCCESS':
      return {
        isFetching: false,
        item: action.student
      };
    default:
      return state;
  }
}

export default combineReducers({
  students,
  currentStudent
});
