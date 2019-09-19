import * as types from './timeclockTypes';
import { apiUrl } from 'config';

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

function addTimestampSuccess(timestamp) {
  return {
    type: 'ADD_TIMESTAMP_SUCCESS',
    timestamp
  };
}

export function addTimestamp(timestamp) {
  return dispatch => {
    dispatch(getTimesheetTimestampsRequest());
    return fetch(`${apiUrl}/api/timestamp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(timestamp)
    })
      .then(response => {
        if (!response.ok) throw Error(`Student already signed in!`);
        return response.json();
      })
      .then(json => {
        dispatch(addTimestampSuccess(json.data));
      })
      .catch(err => dispatch(addTimestampFailure(err)));
  };
}

export function addTimestampFailure(error) {
  return {
    type: 'ADD_TIMESTAMP_FAILURE',
    error
  };
}

function deleteTimestampSuccess(timestampId) {
  return {
    type: 'DELETE_TIMESTAMP_SUCCESS',
    timestampId
  };
}

function getTimesheetTimestampsRequest() {
  return {
    type: 'GET_TIMESHEET_TIMESTAMPS_REQUEST'
  };
}

function getTimesheetTimestampsSuccess(timestamps) {
  return {
    type: 'GET_TIMESHEET_TIMESTAMPS_SUCCESS',
    timestamps
  };
}

export function getTimesheetTimestamps(timesheetId) {
  return dispatch => {
    dispatch(getTimesheetTimestampsRequest());
    return fetch(`${apiUrl}/api/timesheet/${timesheetId}/timestamps`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getTimesheetTimestampsSuccess(json.data));
      });
  };
}

export function deleteTimestamp(timestampId) {
  return dispatch => {
    dispatch(getTimesheetTimestampsRequest());
    return fetch(`${apiUrl}/api/timestamp/${timestampId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(json => {
        dispatch(deleteTimestampSuccess(timestampId));
      })
      .catch(err => console.log(err));
  };
}
