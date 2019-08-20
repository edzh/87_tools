import * as types from '../actions/sessionTypes';

const initialState = {
  sessions: [],
  currentSession: {
    isFetching: false
  },
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
    case 'CURRENT_SESSION_REQUEST':
    case 'CURRENT_SESSION_SUCCESS':
    case 'CURRENT_SESSION_CLUBS_SUCCESS':
      return {
        ...state,
        currentSession: currentSession(state.currentSession, action)
      };
    default:
      return state;
  }
}

function currentSession(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_SESSION_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_SESSION_SUCCESS':
      return {
        ...state,
        isFetching: false,
        ...action.session
      };
    case 'CURRENT_SESSION_CLUBS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        clubs: action.clubs
      };
    default:
      return state;
  }
}
