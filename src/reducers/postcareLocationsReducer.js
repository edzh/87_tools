import {
  ADD_CHILD_TO_LIBRARY,
  REMOVE_CHILD_FROM_LIBRARY,
  ADD_CHILD_TO_GYM,
  REMOVE_CHILD_FROM_GYM
} from '../actions/postcareLocationsActions';

export default function postcareLocations(state = {}, action) {
  switch (action.type) {
    case ADD_CHILD_TO_LIBRARY:
      return {
        ...state,

        name: action.child.name
      };
    default:
      return state;
  }
}
