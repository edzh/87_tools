import * as types from '../actions/timeclockTypes';

const initialState = {
  students: [],
  inTimesheet: null,
  outTimesheet: null,
  isFetching: false
};

export default function timeclock(state = initialState, action) {
  switch (action.type) {
    case types.SET_SELECTOR_STUDENTS:
      return {
        ...state,
        students: action.students
      };
    case types.FETCH_TIMESHEET_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    default:
      return state;
  }
}
