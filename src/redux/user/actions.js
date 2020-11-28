/* eslint-disable import/prefer-default-export */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from './types';

export function userLoginRequest(seanceID) {
  return { type: USER_LOGIN_REQUEST, payload: seanceID };
}

export function userLoginFailure(value = true) {
  return { type: USER_LOGIN_FAILURE, payload: value };
}

export function userLoginSuccess(value = true) {
  return { type: USER_LOGIN_SUCCESS, payload: value };
}
