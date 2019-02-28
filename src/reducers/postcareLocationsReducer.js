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
            grade: action.child.grade,
            present: true
          }
        ]
      };
    case REMOVE_CHILD_FROM_LIBRARY:
      return {
        ...state,
        library: state.library.map(child => {
          if (child.name === action.child.name) {
            return {
              ...child,
              present: !child.present
            };
          }
          return child;
        })
      };
    default:
      return state;
  }
}
