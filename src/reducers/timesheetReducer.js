import * as types from '../actions/timesheetTypes';

const initialState = {
  isFetching: false,
  timesheets: []
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
        timesheets: action.timesheets,
        isFetching: false
      };
    case types.FETCH_TIMESHEETS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
