/* eslint-disable import/prefer-default-export */
import {
  ADMIN_MOVIES_REQUEST,
  ADMIN_MOVIES_FAILURE,
  ADMIN_MOVIES_SUCCESS,
  ADMIN_MOVIES_ADD,
  ADMIN_MOVIES_ADD_FORM_SHOW,
  ADMIN_MOVIES_ADD_FORM_HIDE,
  ADMIN_MOVIES_ADD_FORM_CHANGE,
  ADMIN_MOVIES_SAVE_SUCCESS_CLEAR,
  ADMIN_MOVIES_SAVE_SUCCESS,
  ADMIN_MOVIES_SAVE_REQUEST,
  ADMIN_MOVIES_SAVE_FAILURE,
  ADMIN_MOVIES_SUCCESS_CLEAR,
} from './types';

export function adminMoviesRequest(id) {
  return { type: ADMIN_MOVIES_REQUEST, payload: id };
}

export function adminMoviesFailure(value = true) {
  return { type: ADMIN_MOVIES_FAILURE, payload: value };
}

export function adminMoviesSuccess(value = true) {
  return { type: ADMIN_MOVIES_SUCCESS, payload: value };
}

export function adminMoviesSuccessClear() {
  return { type: ADMIN_MOVIES_SUCCESS_CLEAR };
}

export function adminMoviesAdd(data) {
  return { type: ADMIN_MOVIES_ADD, payload: data };
}

export function adminMoviesSaveRequest(data) {
  return { type: ADMIN_MOVIES_SAVE_REQUEST, payload: data };
}

export function adminMoviesSaveSuccess(value) {
  return { type: ADMIN_MOVIES_SAVE_SUCCESS, payload: value };
}

export function adminMoviesSaveSuccessClear() {
  return { type: ADMIN_MOVIES_SAVE_SUCCESS_CLEAR };
}

export function adminMoviesSaveFailure(err) {
  return { type: ADMIN_MOVIES_SAVE_FAILURE, payload: { err } };
}

export function adminMoviesAddFormShow() {
  return { type: ADMIN_MOVIES_ADD_FORM_SHOW };
}

export function adminMoviesAddFormHide() {
  return { type: ADMIN_MOVIES_ADD_FORM_HIDE };
}

export function adminMoviesAddFormChange(data) {
  return { type: ADMIN_MOVIES_ADD_FORM_CHANGE, payload: data };
}
