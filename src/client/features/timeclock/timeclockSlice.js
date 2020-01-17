import { createSlice } from '@reduxjs/toolkit';
import { fetchTimestamps } from 'client/api/fetchTimestamps';
import { fetchClubs } from 'client/api/fetchClubs';
import { fetchTimesheets } from 'client/api/fetchTimesheets';
import * as schema from 'client/schemas/schema';
import { format } from 'date-fns';
import { normalize } from 'normalizr';

const initialState = {
  date: format(Date.now(), "yyyy-MM-dd'T'hh:mm:ss.SSSxxx"),
  timesheets: {
    byId: {},
    allIds: ''
  },
  timestamps: {
    byId: {},
    allIds: [],
    studentIds: [],
    isFetching: false,
    error: false,
    message: ''
  },
  clubs: {
    allIds: [],
    isFetching: false,
    error: false,
    message: false
  }
};

const timeclockSlice = createSlice({
  name: 'timeclock',
  initialState,
  reducers: {
    getTimestampsSuccess(state, action) {
      const normalizedTimestamps = normalize(
        action.payload,
        schema.timestampList
      );
      const normalizedStudents = normalize(
        action.payload,
        schema.timestampListStudents
      );

      state.timestamps = {
        byId: normalizedTimestamps.entities.timestamps,
        allIds: normalizedTimestamps.result,
        studentIds: normalizedStudents.result,
        isFetching: false
      };
    },
    getTimestampsFailure(state, action) {
      state.timestamps = {
        error: true,
        message: action.payload,
        isFetching: false
      };
    },
    getClubsSuccess(state, action) {
      const normalizedClubs = normalize(action.payload, schema.clubList);

      state.clubs.allIds = normalizedClubs.result;
    },
    getClubsFailure(state, action) {
      state.clubs = {
        error: true,
        message: action.payload,
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
    getTimesheetByIdSuccess(state, action) {
      const normalizedTimesheets = normalize(action.payload, schema.timesheet);

      state.timesheets.byId = normalizedTimesheets.entities.timesheets;
      state.timesheets.allIds = normalizedTimesheets.result;
    },
    getTimesheetByIdFailure(state, action) {
      state.timesheets = {
        error: true,
        message: action.payload,
        isFetching: false
      };
    }
  }
});

export const {
  getTimestampsSuccess,
  getTimestampsFailure,
  getClubsSuccess,
  getClubsFailure,
  getTimesheetByIdSuccess,
  getTimesheetByIdFailure
} = timeclockSlice.actions;

export const getTimestampsByTimesheet = timesheetId => async dispatch => {
  try {
    const timestamps = await fetchTimestamps.get.timesheet(timesheetId);
    dispatch(getTimestampsSuccess(timestamps));
  } catch (err) {
    dispatch(getTimestampsFailure(err.toString));
  }
};

export const getClubsBySessionDay = (sessionId, day) => async dispatch => {
  try {
    const clubs = await fetchClubs.get.session(sessionId, day);
    dispatch(getClubsSuccess(clubs));
  } catch (err) {
    dispatch(getClubsFailure(err.toString));
  }
};

export const getTimesheetById = timesheetId => async dispatch => {
  try {
    const timesheet = await fetchTimesheets.get.one(timesheetId);
    dispatch(getTimesheetByIdSuccess(timesheet));
  } catch (err) {
    dispatch(getTimesheetByIdFailure(err.toString));
  }
};

export default timeclockSlice.reducer;
