/* eslint-disable import/prefer-default-export */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './types';

export function userLoginRequest(data) {
  return { type: USER_LOGIN_REQUEST, payload: data };
}

export function userLoginFailure(value = true) {
  return { type: USER_LOGIN_FAILURE, payload: value };
}

export function userLoginSuccess(value = true) {
  return { type: USER_LOGIN_SUCCESS, payload: value };
}

export function userLogout() {
  return { type: USER_LOGOUT };
}
