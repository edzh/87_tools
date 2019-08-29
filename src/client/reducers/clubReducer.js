import { combineReducers } from 'redux';

import * as types from '../actions/clubTypes';

const initialClubsState = {
  items: [],
  isFetching: false
};

const initialCurrentClubState = {
  item: {},
  isFetching: false
};

function clubs(state = initialClubsState, action) {
  switch (action.type) {
    case types.FETCH_CLUBS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_CLUBS_SUCCESS:
    case 'GET_SESSION_CLUBS_SUCCESS':
      return {
        ...state,
        items: action.clubs,
        isFetching: false
      };
    case types.FETCH_CLUBS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.SET_CLUB:
      return {
        ...state,
        id: action.club
      };
    default:
      return state;
  }
}

function currentClub(state = { isFetching: false }, action) {
  switch (action.type) {
    case 'CURRENT_CLUB_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_CURRENT_CLUB_SUCCESS':
      return {
        isFetching: false,
        item: action.club
      };
    case 'GET_CLUB_STUDENTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        students: action.students
      };
    default:
      return state;
  }
}

export default combineReducers({
  clubs,
  currentClub
});
