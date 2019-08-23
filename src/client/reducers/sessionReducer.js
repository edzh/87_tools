import { combineReducers } from 'redux';
import * as types from '../actions/sessionTypes';

const initialSessionState = {
  items: [],
  isFetching: false
};

const initialCurrentSessionState = {
  item: [],
  clubs: [],
  isFetching: false
};

function sessions(state = initialSessionState, action) {
  switch (action.type) {
    case types.FETCH_SESSIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        items: action.sessions,
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

function currentSession(state = initialCurrentSessionState, action) {
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
        item: action.session
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

export default combineReducers({
  sessions,
  currentSession
});
