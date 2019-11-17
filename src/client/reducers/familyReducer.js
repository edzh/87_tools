import { combineReducers } from 'redux';
import * as types from '../actions/familyTypes';

const initialState = {
  families: [],
  isFetching: false
};

const initialFamiliesState = {
  isFetching: false,
  items: []
};

const initialCurrentFamilyState = {
  isFetching: false
};

function family(state = initialState, action) {
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

export function families(state = initialFamiliesState, action) {
  switch (action.type) {
    case 'FETCH_FAMILIES_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_FAMILIES_SUCCESS':
    case 'GET_PROGRAM_FAMILIES_SUCCESS':
      return {
        ...state,
        items: action.families,
        isFetching: false
      };
    case 'ADD_FAMILY_SUCCESS':
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }

      return {
        ...state,
        items: [action.family, ...state.items].sort(compare),
        recentFamily: action.family,
        isFetching: false
      };
    default:
      return state;
  }
}
