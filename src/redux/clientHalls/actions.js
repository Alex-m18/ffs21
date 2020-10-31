/* eslint-disable import/prefer-default-export */
import {
  CLIENT_HALLS_REQUEST,
  CLIENT_HALLS_FAILURE,
  CLIENT_HALLS_SUCCESS,
  CLIENT_HALLS_CLEAR,
} from './types';

export function clientHallsRequest(IDs = []) {
  return { type: CLIENT_HALLS_REQUEST, payload: IDs };
}

export function clientHallsFailure(value = true) {
  return { type: CLIENT_HALLS_FAILURE, payload: value };
}

export function clientHallsSuccess(value = true) {
  return { type: CLIENT_HALLS_SUCCESS, payload: value };
}

export function clientHallsClear() {
  return { type: CLIENT_HALLS_CLEAR };
}
