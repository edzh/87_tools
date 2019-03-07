import * as types from '../actions/studentTypes';

const initialState = {
  isFetching: false,
  students: []
};

export default function pinLookup(state = initialState, action) {
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
    default:
      return state;
  }
}
