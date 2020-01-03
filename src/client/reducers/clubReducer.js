import { combineReducers } from 'redux';

const initialClubsState = {
  items: {
    byId: {},
    allIds: []
  },
  isFetching: false
};

const initialCurrentClubState = {
  item: {
    byId: {},
    allIds: ''
  },
  isFetching: false
};

export function clubs(state = initialClubsState, action) {
  switch (action.type) {
    case 'FETCH_CLUBS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_CLUBS_SUCCESS':
      return {
        ...state,
        items: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        },
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

export function currentClub(state = initialCurrentClubState, action) {
  switch (action.type) {
    case 'FETCH_CURRENT_CLUB_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_CLUB_SUCCESS':
      return {
        ...state,
        isFetching: false,
        item: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        }
      };
    case 'GET_CLUB_STUDENTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        students: action.students
      };
    case 'UPDATE_CLUB_SUCCESS':
      return {
        ...state,
        isFetching: false,
        item: action.club
      };
    default:
      return state;
  }
}
