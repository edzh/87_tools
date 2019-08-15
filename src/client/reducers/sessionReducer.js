import * as types from '../actions/sessionTypes';

const initialState = {
  sessions: [],
  isFetching: false
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SESSIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        sessions: action.sessions,
        isFetching: false
      };
    case types.FETCH_SESSIONS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.SET_SESSION:
      return {
        ...state,
        id: action.session
      };
    default:
      return state;
  }
}
