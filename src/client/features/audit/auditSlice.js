import { createSlice } from '@reduxjs/toolkit';
import { fetchClubs } from 'client/api/fetchClubs';
import { fetchSessions } from 'client/api/fetchSessions';
import { fetchStudents } from 'client/api/fetchStudents';
import { fetchTimestamps } from 'client/api/fetchTimestamps';
import { fetchTimesheets } from 'client/api/fetchTimesheets';
import * as schema from '../../schemas/schema';
import { normalize } from 'normalizr';

const initialState = {
  clubs: {
    byId: {},
    allIds: []
  },
  students: {
    byId: {},
    allIds: [],
    isFetching: false,
    error: false,
    message: ''
  },
  sessions: {
    byId: {},
    allIds: [],
    isFetching: false,
    error: false,
    message: ''
  },
  timestamps: {
    byId: {},
    allIds: [],
    isFetching: false,
    error: false,
    message: ''
  },
  timesheets: {
    byId: {},
    allIds: [],
    isFetching: false,
    error: false,
    message: ''
  },
  isFetching: false
};

const auditPageSlice = createSlice({
  name: 'auditPage',
  initialState,
  reducers: {
    getStudentsSuccess(state, action) {
      const normalizedStudents = normalize(action.payload, schema.studentList);

      state.students.allIds = normalizedStudents.result;
      state.students.byId = normalizedStudents.entities.students;
      state.students.isFetching = false;
    },
    getStudentsFailure(state, action) {
      state.students = {
        error: true,
        message: action.payload,
        isFetching: false
      };
    },
    getClubsSuccess(state, action) {
      const normalizedClubs = normalize(action.payload, schema.clubList);

      state.clubs.allIds = normalizedClubs.result;
      state.clubs.byId = normalizedClubs.entities.clubs;
      state.clubs.isFetching = false;
    },
    getClubsFailure(state, action) {
      state.isFetching = false;
      state.item = {
        error: true,
        message: action.payload
      };
    },
    getSessionsSuccess(state, action) {
      const normalizedSessions = normalize(action.payload, schema.sessionList);

      state.sessions.allIds = normalizedSessions.result;
      state.sessions.byId = normalizedSessions.entities.sessions;
      state.sessions.isFetching = false;
    },
    getSessionsFailure(state, action) {
      state.sessions = {
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

      state.timestamps = {
        byId: normalizedTimestamps.entities.timestamps,
        allIds: normalizedTimestamps.result,
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
    }
  }
});

export const {
  getStudentsSuccess,
  getStudentsFailure,
  getClubsSuccess,
  getClubsFailure,
  getSessionsSuccess,
  getSessionsFailure,
  getTimestampsSuccess,
  getTimestampsFailure,
  getTimesheetsSuccess,
  getTimesheetsFailure
} = auditPageSlice.actions;

export const fetchStudentsByProgram = programId => async dispatch => {
  try {
    const students = await fetchStudents.get.program(programId);
    dispatch(getStudentsSuccess(students));
  } catch (err) {
    dispatch(getStudentsFailure(err.toString()));
  }
};

export const fetchAllClubs = () => async dispatch => {
  try {
    const club = await fetchClubs.get.all();
    dispatch(getClubsSuccess(club));
  } catch (err) {
    dispatch(getClubsFailure(err.toString()));
  }
};

export const fetchSessionsByProgram = programId => async dispatch => {
  try {
    const sessions = await fetchSessions.get.program(programId);
    dispatch(getSessionsSuccess(sessions));
  } catch (err) {
    dispatch(getSessionsFailure(err.toString()));
  }
};

export const updateCurrentClub = club => async dispatch => {
  try {
    const newClub = await fetchClubs.update(club);
    dispatch(getClubsSuccess({ newClub }));
  } catch (err) {
    dispatch(getClubsFailure(err.toString()));
  }
};

export const fetchTimestampsByDateRange = (start, end) => async dispatch => {
  try {
    const timestamps = await fetchTimestamps.get.dateRange(start, end);
    dispatch(getTimestampsSuccess(timestamps));
  } catch (err) {
    dispatch(getTimestampsFailure(err.toString()));
  }
};

export const fetchAllTimesheets = () => async dispatch => {
  try {
    const timesheets = await fetchTimesheets.get.all();
    dispatch(getTimesheetsSuccess(timesheets));
  } catch (err) {
    dispatch(getTimesheetsFailure(err.toString()));
  }
};

export default auditPageSlice.reducer;
