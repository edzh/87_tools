import { combineReducers } from 'redux';

const initialClubsState = {
  isFetching: false
};

const initialCurrentClubState = {
  isFetching: false
};

function clubs(state = initialClubsState, action) {
  switch (action.type) {
    case 'FETCH_CLUBS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_CLUBS_SUCCESS':
    case 'GET_SESSION_CLUBS_SUCCESS':
      return {
        ...state,
        items: action.clubs,
        isFetching: false
      };
    case 'GET_CLUBS_FAILURE':
      return {
        ...state,
        isFetching: false
      };
    case 'ADD_CLUB_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.club]
      };
    case 'DELETE_CLUB_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: state.items.filter(club => club._id !== action.clubId)
      };
    default:
      return state;
  }
}

function currentClub(state = { isFetching: false }, action) {
  switch (action.type) {
    case 'FETCH_CURRENT_CLUB_REQUEST':
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
    case 'UPDATE_CLUB_SUCCESs':
      return {
        ...state,
        isFetching: false,
        item: action.club
      };
    default:
      return state;
  }
}

export default combineReducers({
  clubs,
  currentClub
});
