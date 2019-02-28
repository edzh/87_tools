import {
  ADD_CHILD_TO_LIBRARY,
  REMOVE_CHILD_FROM_LIBRARY,
  ADD_CHILD_TO_GYM,
  REMOVE_CHILD_FROM_GYM
} from '../actions/postcareLocationsActions';

const initialState = {
  library: [],
  gym: []
};

export default function postcareLocations(state = initialState, action) {
  switch (action.type) {
    case ADD_CHILD_TO_LIBRARY:
      return {
        ...state,
        library: [
          ...state.library,
          {
            name: action.child.name,
            grade: action.child.grade
          }
        ]
      };
    default:
      return state;
  }
}
