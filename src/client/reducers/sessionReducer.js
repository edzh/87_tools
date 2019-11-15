import { combineReducers } from 'redux';
import * as types from '../actions/sessionTypes';

const initialSessionState = {
  items: [],
  isFetching: false
};

const initialCurrentSessionState = {
  item: {},
  isFetching: false
};

export function sessions(state = initialSessionState, action) {
  switch (action.type) {
    case types.FETCH_SESSIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_SESSIONS_SUCCESS:
    case 'GET_PROGRAM_SESSIONS_SUCCESS':
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
    case 'ADD_SESSION_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.session]
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

export function currentSession(state = initialCurrentSessionState, action) {
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
    case 'ADD_CURRENT_SESSION_CLUBS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        clubs: [...state, action.clubs]
      };
    default:
      return state;
  }
}
