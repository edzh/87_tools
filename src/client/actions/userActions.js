import 'cross-fetch';
import * as types from './userTypes';
import { apiUrl } from 'config';

export function signInRequest() {
  return {
    type: types.SIGNIN_REQUEST
  };
}

export function signInSuccess(data) {
  return {
    type: types.SIGNIN_SUCCESS,
    data
  };
}

export function signInFailure(error) {
  return {
    type: types.SIGNIN_FAILURE,
    error
  };
}

export function signIn(email, password) {
  return dispatch => {
    dispatch(signInRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(response => {
        dispatch(fetchUserInfo(signInSuccess, signInFailure, response.token));
        localStorage.setItem('id_token', response.token);
      })
      .catch(error => dispatch(signInFailure(error)));
  };
}

export function signUpRequest() {
  return {
    type: types.SIGNUP_REQUEST
  };
}

export function signUpSuccess(data) {
  return {
    type: types.SIGNUP_SUCCESS,
    data
  };
}

export function signUpFailure(error) {
  return {
    type: types.SIGNUP_FAILURE,
    error
  };
}

export function signUp(email, password) {
  return dispatch => {
    dispatch(signUpRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(response => {
        dispatch(fetchUserInfo(signUpSuccess, signUpFailure, response.token));
        localStorage.setItem('id_token', response.token);
      })
      .catch(error => dispatch(signUpFailure(error)));
  };
}

export function signOut() {
  return dispatch => {
    localStorage.removeItem('id_token');
    dispatch(signOutRequest());
  };
}

export function signOutRequest() {
  return {
    type: types.SIGNOUT_REQUEST
  };
}

export function fetchUserInfo(success, failure, token) {
  return dispatch => {
    return fetch(`${apiUrl}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(success(json.data));
      })
      .catch(error => dispatch(failure(error)));
  };
}

function updateUserRequest() {
  return {
    type: 'UPDATE_USER_REQUEST'
  };
}

function updateUserSuccess(user) {
  return {
    type: 'UPDATE_USER_SUCCESS',
    user
  };
}

function updateUser(user) {
  return dispatch => {
    dispatch(updateUserRequest());
    return fetch(`${apiUrl}/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(updateUserSuccess(json.data));
      });
  };
}
