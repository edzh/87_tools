import * as types from '../actions/studentTypes';

const initialState = {
  isFetching: false,
  students: []
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
    default:
      return state;
  }
}
