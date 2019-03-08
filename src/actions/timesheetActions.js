import 'cross-fetch';

import * as types from './timesheetTypes';

function fetchTimesheetsRequest() {
  return {
    type: types.FETCH_TIMESHEETS_REQUEST
  };
}

function fetchTimesheetsSuccess(timesheets) {
  return {
    type: types.FETCH_TIMESHEETS_SUCCESS,
    timesheets
  };
}

function fetchTimesheetsFailure() {
  return {
    type: types.FETCH_TIMESHEETS_FAILURE
  };
}

export function fetchTimesheets() {
  return dispatch => {
    dispatch(fetchTimesheetsRequest());
    return fetch(`http://localhost:3001/api/timesheet`)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchTimesheetsSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchTimesheetsFailure());
      });
  };
}

export function setTimesheet(timesheet) {
  return {
    type: types.SET_TIMESHEET,
    timesheet
  };
}
