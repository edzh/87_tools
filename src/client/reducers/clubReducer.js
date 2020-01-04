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
      const clubs = state.items.byId;
      const clubIds = state.items.allIds;

      const { byId, allIds } = action.payload;

      return {
        ...state,
        isFetching: false,
        items: {
          byId: {
            ...clubs,
            [allIds]: byId[allIds]
          },
          allIds: [...clubIds, allIds]
        }
      };
    case 'DELETE_CLUB_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: {
          byId: {
            ...state.items.byId,
            [action.payload.allIds]: null
          },
          allIds: state.items.allIds.filter(
            clubId => clubId !== action.payload.allIds
          )
        }
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
    default:
      return state;
  }
}
