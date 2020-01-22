import { createSlice } from '@reduxjs/toolkit';
import { fetchClubs } from 'client/api/fetchClubs';
import { fetchSessions } from 'client/api/fetchSessions';
import { fetchStudents } from 'client/api/fetchStudents';
import * as schema from '../../schemas/schema';
import { normalize } from 'normalizr';

const initialState = {
  item: {
    byId: {},
    allIds: ''
  },
  students: {
    allIds: [],
    isFetching: false,
    error: false,
    message: ''
  },
  sessions: {
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

      state.students.allIds = normalizedStudents.result;
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

      state.sessions.allIds = normalizedSessions.result;
    },
    getSessionsFailure(state, action) {
      state.sessions = {
        error: true,
        message: action.payload,
        isFetching: false
      };
    },
    addStudentToClubSuccess(state, action) {
      const normalizedStudent = normalize(action.payload, schema.student);

      state.students.allIds = [
        ...state.students.allIds,
        normalizedStudent.result
      ];
    }
  }
});

export const {
  getStudentsSuccess,
  getStudentsFailure,
  getClubByIdSuccess,
  getClubByIdFailure,
  getSessionsSuccess,
  getSessionsFailure,
  addStudentToClubSuccess
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

export const addStudentToClub = (student, clubId) => async dispatch => {
  try {
    const newStudent = await fetchStudents.update(student);
    dispatch(addStudentToClubSuccess(newStudent));
  } catch (err) {
    dispatch(getStudentsFailure(err.toString()));
  }
};

export default clubPageSlice.reducer;
