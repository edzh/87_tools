import * as types from '../actions/sessionTypes';

const initialSessionState = {
  items: {
    byId: {},
    allIds: []
  },
  isFetching: false
};

const initialCurrentSessionState = {
  item: {
    byId: {},
    allIds: ''
  },
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
      return {
        ...state,
        items: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        },
        isFetching: false
      };
    case types.FETCH_SESSIONS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case 'ADD_SESSION_SUCCESS':
      const sessions = state.items.byId;
      const sessionIds = state.items.allIds;

      const { byId, allIds } = action.payload;

      return {
        ...state,
        isFetching: false,
        items: {
          byId: {
            ...sessions,
            [allIds]: byId[allIds]
          },
          allIds: [...sessionIds, allIds]
        },
        recentSession: allIds
      };
    case 'DELETE_SESSION_SUCCESS':
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
