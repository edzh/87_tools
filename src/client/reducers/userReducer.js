import * as types from '../actions/userTypes';

const initialState = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  isFetching: localStorage.getItem('id_token') ? true : false,
  item: {
    _id: ''
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        item: action.payload.byId[action.payload.allIds]
      };
    case types.SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        item: action.item,
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
        item: action.item,
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
        item: {}
      };
    default:
      return state;
  }
}
