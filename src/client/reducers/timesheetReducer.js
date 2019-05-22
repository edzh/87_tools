import * as types from '../actions/timesheetTypes';

const initialState = {
  isFetching: false,
  fetchedTimesheets: [],
  timesheet: ''
};

export default function pinLookup(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TIMESHEETS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_TIMESHEETS_SUCCESS:
      return {
        ...state,
        fetchedTimesheets: action.timesheets,
        isFetching: false
      };
    case types.FETCH_TIMESHEETS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.SET_TIMESHEET:
      return {
        ...state,
        timesheet: action.timesheet
      };
    default:
      return state;
  }
}
