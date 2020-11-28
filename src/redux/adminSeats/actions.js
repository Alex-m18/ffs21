/* eslint-disable import/prefer-default-export */
import {
  ADMIN_SEATS_CHANGE_STATES,
  ADMIN_SEATS_CHANGE_HALL,
  ADMIN_SEATS_REQUEST,
  ADMIN_SEATS_FAILURE,
  ADMIN_SEATS_SUCCESS,
  ADMIN_SEATS_UPDATE_REQUEST,
  ADMIN_SEATS_UPDATE_SUCCESS,
  ADMIN_SEATS_UPDATE_FAILURE,
  ADMIN_SEATS_UPDATE_SUCCESS_CLEAR,
} from './types';

export function adminSeatsChangeStates(states) {
  return { type: ADMIN_SEATS_CHANGE_STATES, payload: states };
}

export function adminSeatsChangeHall(hall) {
  return { type: ADMIN_SEATS_CHANGE_HALL, payload: hall };
}

export function adminSeatsRequest(id) {
  return { type: ADMIN_SEATS_REQUEST, payload: id };
}

export function adminSeatsFailure(value = true) {
  return { type: ADMIN_SEATS_FAILURE, payload: value };
}

export function adminSeatsSuccess(value = true) {
  return { type: ADMIN_SEATS_SUCCESS, payload: value };
}

export function adminSeatsUpdateRequest(data) {
  return { type: ADMIN_SEATS_UPDATE_REQUEST, payload: data };
}

export function adminSeatsUpdateSuccess(value) {
  return { type: ADMIN_SEATS_UPDATE_SUCCESS, payload: value };
}

export function adminSeatsUpdateFailure(err) {
  return { type: ADMIN_SEATS_UPDATE_FAILURE, payload: { err } };
}

export function adminSeatsUpdateSuccessClear() {
  return { type: ADMIN_SEATS_UPDATE_SUCCESS_CLEAR };
}
