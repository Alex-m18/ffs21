/* eslint-disable import/prefer-default-export */
import {
  ADMIN_HALLS_REQUEST,
  ADMIN_HALLS_FAILURE,
  ADMIN_HALLS_SUCCESS,
  ADMIN_HALLS_CLEAR,
  ADMIN_HALLS_REMOVE_REQUEST,
  ADMIN_HALLS_REMOVE_SUCCESS,
  ADMIN_HALLS_REMOVE_FAILURE,
  ADMIN_HALLS_ADD_REQUEST,
  ADMIN_HALLS_ADD_SUCCESS,
  ADMIN_HALLS_ADD_FAILURE,
  ADMIN_HALLS_UPDATE_REQUEST,
  ADMIN_HALLS_UPDATE_SUCCESS,
  ADMIN_HALLS_UPDATE_SUCCESS_CLEAR,
  ADMIN_HALLS_UPDATE_FAILURE,
} from './types';

export function adminHallsRequest() {
  return { type: ADMIN_HALLS_REQUEST };
}

export function adminHallsFailure(value = true) {
  return { type: ADMIN_HALLS_FAILURE, payload: value };
}

export function adminHallsSuccess(value = true) {
  return { type: ADMIN_HALLS_SUCCESS, payload: value };
}

export function adminHallsClear() {
  return { type: ADMIN_HALLS_CLEAR };
}

export function adminHallsRemoveRequest(id) {
  return { type: ADMIN_HALLS_REMOVE_REQUEST, payload: id };
}

export function adminHallsRemoveSuccess(id) {
  return { type: ADMIN_HALLS_REMOVE_SUCCESS, payload: id };
}

export function adminHallsRemoveFailure(err, id) {
  return { type: ADMIN_HALLS_REMOVE_FAILURE, payload: { err, id } };
}

export function adminHallsAddRequest(data) {
  return { type: ADMIN_HALLS_ADD_REQUEST, payload: data };
}

export function adminHallsAddSuccess(value) {
  return { type: ADMIN_HALLS_ADD_SUCCESS, payload: value };
}

export function adminHallsAddFailure(err) {
  return { type: ADMIN_HALLS_ADD_FAILURE, payload: { err } };
}

export function adminHallsUpdateRequest(data) {
  return { type: ADMIN_HALLS_UPDATE_REQUEST, payload: data };
}

export function adminHallsUpdateSuccess(value) {
  return { type: ADMIN_HALLS_UPDATE_SUCCESS, payload: value };
}

export function adminHallsUpdateSuccessClear() {
  return { type: ADMIN_HALLS_UPDATE_SUCCESS_CLEAR };
}

export function adminHallsUpdateFailure(err) {
  return { type: ADMIN_HALLS_UPDATE_FAILURE, payload: { err } };
}
