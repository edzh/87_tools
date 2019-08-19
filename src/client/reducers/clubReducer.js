import * as types from '../actions/clubTypes';

const initialState = {
  clubs: [],
  currentClub: {
    isFetching: false,
    students: []
  },
  isFetching: false
};

export default function club(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CLUBS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_CLUBS_SUCCESS:
      return {
        ...state,
        clubs: action.clubs,
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
    case 'CURRENT_CLUB_REQUEST':
    case 'GET_CURRENT_CLUB_SUCCESS':
    case 'GET_CLUB_STUDENTS_SUCCESS':
      return { ...state, currentClub: currentClub(state.currentClub, action) };
    default:
      return state;
  }
}

function currentClub(state = { isFetching: false }, action) {
  switch (action.type) {
    case 'CURRENT_CLUB_REQUEST':
      return { isFetching: true };
    case 'GET_CURRENT_CLUB_SUCCESS':
      return {
        isFetching: false,
        ...action.club
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
