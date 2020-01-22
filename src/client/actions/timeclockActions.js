import * as types from './timeclockTypes';
import { apiUrl } from 'config';

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

function getSigninTimesheetTimestampsSuccess(timestamps) {
  return {
    type: 'GET_SIGNIN_TIMESHEET_TIMESTAMPS_SUCCESS',
    timestamps
  };
}

function getSignoutTimesheetTimestampsSuccess(timestamps) {
  return {
    type: 'GET_SIGNOUT_TIMESHEET_TIMESTAMPS_SUCCESS',
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

export function getDateTimesheetTimestamps(date, io) {
  return dispatch => {
    dispatch(getTimesheetTimestampsRequest());
    return fetch(`${apiUrl}/api/timesheet?io=${io}&date=${date}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.data.length === 0) throw Error('Sign in does not exist!');
        fetch(`${apiUrl}/api/timesheet/${json.data[0]._id}/timestamps`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        })
          .then(response => response.json())
          .then(json => {
            io === 'in'
              ? dispatch(getSigninTimesheetTimestampsSuccess(json.data))
              : dispatch(getSignoutTimesheetTimestampsSuccess(json.data));
          });
      })
      .catch(err => console.error(err));
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
