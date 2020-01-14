import { createSlice } from '@reduxjs/toolkit';
import { fetchStudents } from 'client/api/fetchStudents';
import { fetchClubs } from 'client/api/fetchClubs';
import { fetchSessions } from 'client/api/fetchSessions';
import * as schema from '../../schemas/schema';
import { normalize } from 'normalizr';

const initialState = {
  item: {
    byId: {},
    allIds: ''
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
  isFetching: false
};

const clubPageSlice = createSlice({
  name: 'clubPage',
  initialState,
  reducers: {
    getStudentsSuccess(state, action) {
      const normalizedStudents = normalize(action.payload, schema.studentList);

      state.students = {
        byId: normalizedStudents.entities.students,
        allIds: normalizedStudents.result
      };
    },
    getStudentsFailure(state, action) {
      state.students = {
        error: true,
        message: action.payload,
        isFetching: false
      };
    },
    getClubByIdSuccess(state, action) {
      const normalizedClub = normalize(action.payload, schema.clubList);

      state.isFetching = false;
      state.item = {
        byId: normalizedClub.entities.clubs,
        allIds: normalizedClub.result
      };
    },
    getClubByIdFailure(state, action) {
      state.isFetching = false;
      state.item = {
        error: true,
        message: action.payload
      };
    },
    getSessionsSuccess(state, action) {
      const normalizedSessions = normalize(action.payload, schema.sessionList);

      state.sessions = {
        byId: normalizedSessions.entities.sessions,
        allIds: normalizedSessions.result
      };
    },
    getSessionsFailure(state, action) {
      state.sessions = {
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
  getClubByIdSuccess,
  getClubByIdFailure,
  getSessionsSuccess,
  getSessionsFailure
} = clubPageSlice.actions;

export const fetchStudentsByClub = clubId => async dispatch => {
  try {
    const students = await fetchStudents.get.club(clubId);
    dispatch(getStudentsSuccess(students));
  } catch (err) {
    dispatch(getStudentsFailure(err.toString()));
  }
};

export const fetchClubById = clubId => async dispatch => {
  try {
    const club = await fetchClubs.get.one(clubId);
    dispatch(getClubByIdSuccess({ club }));
  } catch (err) {
    dispatch(getClubByIdFailure(err.toString()));
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
    const club = await fetchClubs.update(club);
    dispatch(getClubByIdSuccess({ club }));
  } catch (err) {
    dispatch(getClubByIdFailure(err.toString()));
  }
};

export const addStudentToCurrentClub = (student, clubId) => async dispatch => {
  try {
    const student = await fetchStudents.update(student);
    dispatch(fetchStudentsByClub(clubId));
  } catch (err) {
    dispatch(getStudentsFailure(err.toString()));
  }
};

export default clubPageSlice.reducer;
