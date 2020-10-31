/* eslint-disable import/prefer-default-export */
import {
  CLIENT_MOVIES_REQUEST,
  CLIENT_MOVIES_FAILURE,
  CLIENT_MOVIES_SUCCESS,
  CLIENT_MOVIES_CLEAR,
} from './types';

export function clientMoviesRequest(IDs = []) {
  return { type: CLIENT_MOVIES_REQUEST, payload: IDs };
}

export function clientMoviesFailure(value = true) {
  return { type: CLIENT_MOVIES_FAILURE, payload: value };
}

export function clientMoviesSuccess(value = true) {
  return { type: CLIENT_MOVIES_SUCCESS, payload: value };
}

export function clientMoviesClear() {
  return { type: CLIENT_MOVIES_CLEAR };
}
