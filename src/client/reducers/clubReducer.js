import * as types from '../actions/clubTypes';

const initialState = {
  clubs: [],
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
    default:
      return state;
  }
}
