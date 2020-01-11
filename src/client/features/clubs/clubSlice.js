import { createSlice } from '@reduxjs/tookit';
import { fetchStudents } from '../../api/fetchStudents';
import * as schema from '../../schemas/schema';
import { normalize } from 'normalizr';

const clubPageSlice = createSlice({
  name: 'clubPage',
  initialState: {
    item: {
      byId: {},
      allIds: ''
    },
    isFetching: false
  },
  reducers: {
    getStudentsSuccess(state, action) {
      const normalizedStudents = normalize(
        action.payload.students,
        student.schema
      );

      state.students = {
        byId: action.payload.byId,
        allIds: action.payload.allIds
      };
    }
  }
});

export const fetchStudents = clubId => async dispatch => {
  try {
    const students = await fetchStudents.get.club(clubId);
    dispatch(getStudentsSuccess(students));
  }
};
