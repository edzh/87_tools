import { combineReducers } from 'redux';

const initialProgramsState = {
  items: {
    byId: {},
    allIds: []
  },
  isFetching: false
};

const initialCurrentProgramState = {
  item: {},
  sessions: [],
  isFetching: false
};

export function programs(state = initialProgramsState, action) {
  switch (action.type) {
    case 'FETCH_PROGRAMS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_PROGRAMS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        }
      };
    case 'ADD_PROGRAM_SUCCESS':
      const programs = state.items.byId;
      const programIds = state.items.allIds;

      const { byId, allIds } = action.payload;

      return {
        ...state,
        isFetching: false,
        items: {
          byId: {
            ...programs,
            [allIds]: byId[allIds]
          },
          allIds: [...programIds, allIds]
        }
      };
    default:
      return state;
  }
}

export function currentProgram(state = initialCurrentProgramState, action) {
  switch (action.type) {
    case 'CURRENT_PROGRAM_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_PROGRAM_SUCCESS':
      return {
        isFetching: false,
        item: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        }
      };
    case 'GET_PROGRAM_SESSIONS_SUCCESS':
      return {
        ...state,
        isFetching: false
      };
    case 'GET_PROGRAM_STUDENTS_SUCCESS':
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
