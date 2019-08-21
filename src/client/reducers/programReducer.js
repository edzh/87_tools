import { combineReducers } from 'redux';

const initialProgramsState = {
  items: [],
  isFetching: false
};

const initialCurrentProgramState = {
  item: {},
  isFetching: false
};

function programs(state = initialProgramsState, action) {
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
        items: action.programs
      };
    default:
      return state;
  }
}

function currentProgram(state = initialCurrentProgramState, action) {
  switch (action.type) {
    case 'CURRENT_PROGRAM_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_PROGRAM_SUCCESS':
      return {
        ...state,
        isFetching: false,
        item: action.program
      };
    default:
      return state;
  }
}

const programReducer = combineReducers({
  programs,
  currentProgram
});

export default programReducer;
