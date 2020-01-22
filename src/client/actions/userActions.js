import 'cross-fetch';
import * as types from './userTypes';
import { fetchUser } from '../api/fetchUser';
import { apiUrl } from 'config';
import * as schema from '../schemas/schema';
import { normalize } from 'normalizr';

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
      .then(json => {
        localStorage.setItem('id_token', json.token);
        dispatch(getUser());
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
        localStorage.setItem('id_token', response.token);
        dispatch(getUser());
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

function updateUserRequest() {
  return {
    type: 'UPDATE_USER_REQUEST'
  };
}

function updateUserSuccess(user) {
  const normalizedUser = normalize(user, schema.user);

  return {
    type: 'UPDATE_USER_SUCCESS',
    payload: {
      byId: normalizedUser.entities.user,
      allIds: normalizedUser.result
    }
  };
}

export function fetchUserSuccess(user) {
  const normalizedUser = normalize(user, schema.user);

  return {
    type: 'FETCH_USER_SUCCESS',
    payload: {
      byId: normalizedUser.entities.user,
      allIds: normalizedUser.result
    }
  };
}

export function getUser() {
  return dispatch => {
    dispatch(updateUserRequest());
    return fetchUser
      .get()
      .then(data => dispatch(fetchUserSuccess(data)))
      .catch(err => console.error(err));
  };
}

export function updateUser(user) {
  return dispatch => {
    dispatch(updateUserRequest());
    return fetchUser
      .update(user)
      .then(data => dispatch(updateUserSuccess(data)));
  };
}
