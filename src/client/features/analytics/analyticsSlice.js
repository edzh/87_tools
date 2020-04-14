import { createSlice } from '@reduxjs/toolkit';
import { fetchTimestamps } from 'client/api/fetchTimestamps';
import { fetchTimesheets } from 'client/api/fetchTimesheets';
import * as schema from '../../schemas/schema';
import { normalize } from 'normalizr';
import { apiUrl } from 'config';

const initialState = {
  timesheets: {
    byId: {},
    allIds: []
  },
  timestamps: []
};

const analyticsPageSlice = createSlice({
  name: 'analyticsPage',
  initialState,
  reducers: {
    getTimesheetsSuccess(state, action) {
      const normalizedTimesheets = normalize(
        action.payload,
        schema.timesheetList
      );

      state.timesheets = {
        byId: normalizedTimesheets.entities.timesheets,
        allIds: normalizedTimesheets.result,
        isFetching: false
      };
    },
    getTimesheetsFailure(state, action) {
      state.timesheets = {
        error: true,
        message: action.payload,
        isFetching: false
      };
    },
    getTimestampsSuccess(state, action) {
      const normalizedTimestamps = normalize(
        action.payload,
        schema.timestampList
      );
      console.log(normalizedTimestamps);
      state.timestamps = {
        byId: normalizedTimestamps.entities.timestamps,
        allIds: normalizedTimestamps.result,
        isFetching: false
      }; // console.log(action.payload)
    }
  }
});

export const {
  getTimesheetsSuccess,
  getTimesheetsFailure,
  getTimestampsSuccess
} = analyticsPageSlice.actions;

export const fetchTimesheetsByDates = (start, end) => async dispatch => {
  try {
    const timesheets = await fetchTimesheets.get.dateRange(start, end);
    dispatch(getTimesheetsSuccess(timesheets));
  } catch (err) {
    dispatch(getTimesheetsFailure(err.toString()));
  }
};

export const fetchTimestampsByTimesheet = timesheetIds => async dispatch => {
  const query = timesheetIds.join('&timesheet=');
  try {
    const timestamps = await fetch(`${apiUrl}/api/timestamp?timesheet=${query}`)
      .then(response => response.json())
      .then(json => json.data);
    dispatch(getTimestampsSuccess(timestamps));
  } catch (err) {
    console.log(err);
  }
};

export const fetchTimestampsByDateRange = (start, end) => async dispatch => {
  try {
    const timestamps = await fetchTimestamps.get.dateRange(start, end);
    dispatch(getTimestampsSuccess(timestamps));
  } catch (err) {
    console.log(err);
  }
};

export default analyticsPageSlice.reducer;
