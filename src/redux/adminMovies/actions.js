/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  ADMIN_MOVIES_REQUEST,
  ADMIN_MOVIES_FAILURE,
  ADMIN_MOVIES_SUCCESS,
  ADMIN_MOVIES_ADD,
  ADMIN_MOVIES_REMOVE,
  ADMIN_MOVIES_ADD_FORM_SHOW,
  ADMIN_MOVIES_ADD_FORM_HIDE,
  ADMIN_MOVIES_ADD_FORM_CHANGE,
  ADMIN_MOVIES_REMOVE_FORM_SHOW,
  ADMIN_MOVIES_REMOVE_FORM_HIDE,
  ADMIN_MOVIES_REMOVE_FORM_CHANGE,
  ADMIN_MOVIES_SAVE_SUCCESS_CLEAR,
  ADMIN_MOVIES_SAVE_SUCCESS,
  ADMIN_MOVIES_SAVE_REQUEST,
  ADMIN_MOVIES_SAVE_FAILURE,
  ADMIN_MOVIES_SUCCESS_CLEAR,
} from './types';

export const adminMoviesRequest = (id) => ({ type: ADMIN_MOVIES_REQUEST, payload: id });
export const adminMoviesFailure = (value) => ({ type: ADMIN_MOVIES_FAILURE, payload: value });
export const adminMoviesSuccess = (value) => ({ type: ADMIN_MOVIES_SUCCESS, payload: value });
export const adminMoviesSuccessClear = () => ({ type: ADMIN_MOVIES_SUCCESS_CLEAR });

export const adminMoviesAdd = (data) => ({ type: ADMIN_MOVIES_ADD, payload: data });
export const adminMoviesRemove = (data) => ({ type: ADMIN_MOVIES_REMOVE, payload: data });

export const adminMoviesSaveRequest = (data) => ({ type: ADMIN_MOVIES_SAVE_REQUEST, payload: data });
export const adminMoviesSaveSuccess = (value) => ({ type: ADMIN_MOVIES_SAVE_SUCCESS, payload: value });
export const adminMoviesSaveSuccessClear = () => ({ type: ADMIN_MOVIES_SAVE_SUCCESS_CLEAR });
export const adminMoviesSaveFailure = (err) => ({ type: ADMIN_MOVIES_SAVE_FAILURE, payload: { err } });

export const adminMoviesAddFormShow = () => ({ type: ADMIN_MOVIES_ADD_FORM_SHOW });
export const adminMoviesAddFormHide = () => ({ type: ADMIN_MOVIES_ADD_FORM_HIDE });
export const adminMoviesAddFormChange = (data) => ({ type: ADMIN_MOVIES_ADD_FORM_CHANGE, payload: data });

export const adminMoviesRemoveFormShow = () => ({ type: ADMIN_MOVIES_REMOVE_FORM_SHOW });
export const adminMoviesRemoveFormHide = () => ({ type: ADMIN_MOVIES_REMOVE_FORM_HIDE });
export const adminMoviesRemoveFormChange = (data) => ({ type: ADMIN_MOVIES_REMOVE_FORM_CHANGE, payload: data });
