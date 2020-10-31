/* eslint-disable import/prefer-default-export */
import {
  CLIENT_SEANCES_REQUEST,
  CLIENT_SEANCES_FAILURE,
  CLIENT_SEANCES_SUCCESS,
  CLIENT_SEANCES_CLEAR,
} from './types';

export function clientSeancesRequest({ date }) {
  return { type: CLIENT_SEANCES_REQUEST, payload: date };
}

export function clientSeancesFailure(value = true) {
  return { type: CLIENT_SEANCES_FAILURE, payload: value };
}

export function clientSeancesSuccess(value = true) {
  return { type: CLIENT_SEANCES_SUCCESS, payload: value };
}

export function clientSeancesClear() {
  return { type: CLIENT_SEANCES_CLEAR };
}
