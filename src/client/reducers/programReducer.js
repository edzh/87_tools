const initialProgramsState = {
  items: {
    byId: {},
    allIds: []
  },
  isFetching: false
};

const initialCurrentProgramState = {
  item: {
    byId: {},
    allIds: ''
  },
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
    case 'DELETE_PROGRAM_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: {
          byId: {
            ...state.items.byId,
            [action.payload.allIds]: null
          },
          allIds: state.items.allIds.filter(
            programId => programId !== action.payload.allIds
          )
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
      const { byId, allIds } = action.payload;

      return {
        isFetching: false,
        item: {
          byId,
          allIds
        }
      };
    default:
      return state;
  }
}
