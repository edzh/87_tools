import { createSlice } from '@reduxjs/toolkit';
import { apiUrl } from 'config';
import headers from 'client/api/headers';

const initialState = {
  item: {},
  isFetching: false,
  error: false,
  message: ''
};

const pinPageSlice = createSlice({
  name: 'pinPage',
  initialState,
  reducers: {
    getPinSuccess(state, action) {
      state.isFetching = false;
      state.item = action.payload;
    },
    getPinFailure(state, action) {
      state.error = true;
      state.message = action.payload;
      state.isFetching = false;
    }
  }
});

export const { getPinSuccess, getPinFailure } = pinPageSlice.actions;

export const fetchPin = pin => async dispatch => {
  try {
    const fetchedPin = await fetch(`${apiUrl}/api/pin/${pin}`, {
      headers
    })
      .then(response => response.json())
      .then(json => json.data);

    dispatch(getPinSuccess(fetchedPin));
  } catch (err) {
    dispatch(getPinFailure(err.toString()));
  }
};

export default pinPageSlice.reducer;
