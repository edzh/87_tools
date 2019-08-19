import * as types from '../actions/studentTypes';

const initialState = {
  isFetching: false,
  students: [],
  currentStudent: {
    isFetching: false
  }
};

export default function student(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.students,
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
      return {
        ...state,
        students: [...state.students, action.student],
        isFetching: false
      };
    case 'STUDENT_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case 'CURRENT_STUDENT_REQUEST':
    case 'CURRENT_STUDENT_SUCCESS':
      return {
        ...state,
        currentStudent: currentStudent(state.currentStudent, action)
      };
    default:
      return state;
  }
}

function currentStudent(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_STUDENT_REQUEST':
      return { isFetching: true };
    case 'CURRENT_STUDENT_SUCCESS':
      return {
        isFetching: false,
        ...action.student
      };
    default:
      return state;
  }
}
