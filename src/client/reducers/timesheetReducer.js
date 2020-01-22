import * as types from '../actions/timesheetTypes';

const initialTimesheetState = {
  isFetching: false
};

const initialCurrentTimesheetState = {
  isFetching: false
};

export function timesheets(state = initialTimesheetState, action) {
  switch (action.type) {
    case types.FETCH_TIMESHEETS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_TIMESHEETS_SUCCESS:
    case 'GET_SESSION_TIMESHEETS_SUCCESS':
      return {
        ...state,
        items: action.timesheets,
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
    case 'ADD_TIMESHEET_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.timesheet],
        isFetching: false
      };
    default:
      return state;
  }
}

export function currentTimesheet(state = initialCurrentTimesheetState, action) {
  switch (action.type) {
    case 'CURRENT_TIMESHEET_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_CURRENT_TIMESHEET_SUCCESS':
      return {
        ...state,
        item: action.timesheet,
        isFetching: false
      };
    default:
      return state;
  }
}
