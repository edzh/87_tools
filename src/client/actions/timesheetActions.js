import 'cross-fetch';

import * as types from './timesheetTypes';

import { apiUrl } from 'config';

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
    return fetch(`${process.env.REACT_APP_API_URL}/api/timesheet`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
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

function currentTimesheetRequest() {
  return {
    type: 'CURRENT_TIMESHEET_REQUEST'
  };
}

function getCurrentTimesheetSuccess(timesheet) {
  return {
    type: 'GET_CURRENT_TIMESHEET_SUCCESS',
    timesheet
  };
}

export function getCurrentTimesheet(timesheetId) {
  return dispatch => {
    dispatch(currentTimesheetRequest());
    return fetch(`${apiUrl}/api/timesheet/${timesheetId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getCurrentTimesheetSuccess(json.data));
      });
  };
}

function addTimesheetSuccess(timesheet) {
  return {
    type: 'ADD_TIMESHEET_SUCCESS',
    timesheet
  };
}

export function addTimesheet(timesheet) {
  return dispatch => {
    dispatch(fetchTimesheetsRequest());
    return fetch(`${apiUrl}/api/timesheet/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(timesheet)
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create timesheet!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addTimesheetSuccess(json.data));
      });
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
        if (!response.ok) {
          throw Error('Unable to create timestamp!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addTimestampSuccess(json.data));
      });
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
