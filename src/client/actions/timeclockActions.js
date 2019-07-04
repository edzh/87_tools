import * as types from './timeclockTypes';

function setSelectorStudents(students) {
  return {
    type: types.SET_SELECTOR_STUDENTS,
    students
  };
}

function fetchTimesheetRequest() {
  return {
    type: types.FETCH_TIMESHEET_REQUEST
  };
}

function fetchInTimesheetSuccess(inTimesheet) {
  return {
    type: types.FETCH_IN_TIMESHEET_SUCCESS,
    inTimesheet
  };
}

function fetchInTimesheetFailure() {
  return {
    type: types.FETCH_IN_TIMESHEET_FAILURE
  };
}

export function fetchInTimesheet() {
  return dispatch => {
    dispatch(fetchTimesheetRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/timesheet`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchInTimesheetSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchInTimesheetFailure());
      });
  };
}

export function fetchOutTimesheet() {
  return dispatch => {
    dispatch(fetchTimesheetRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/timesheet`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchOutTimesheetSuccess(json.data));
      })
      .catch(err => {
        dispatch(fetchOutTimesheetFailure());
      });
  };
}

function fetchOutTimesheetSuccess(outTimesheet) {
  return {
    type: types.FETCH_OUT_TIMESHEET_SUCCESS,
    outTimesheet
  };
}

function fetchOutTimesheetFailure() {
  return {
    type: types.FETCH_OUT_TIMESHEET_FAILURE
  };
}
