import * as types from '../actions/familyTypes';

const initialState = {
  families: [],
  isFetching: false
};

export default function family(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAMILIES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_FAMILIES_SUCCESS:
      return {
        ...state,
        families: action.families,
        isFetching: false
      };
    case types.FETCH_FAMILIES_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.SET_FAMILY:
      return {
        ...state,
        id: action.family
      };
    default:
      return state;
  }
}
