import * as types from '../actions/userTypes';

const initialState = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  isFetching: localStorage.getItem('id_token') ? true : false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        isAuthenticated: true
      };
    case types.SIGNIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: action.error
      };

    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        isAuthenticated: true
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: action.error
      };

    case types.SIGNOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        data: {}
      };
    default:
      return state;
  }
}
