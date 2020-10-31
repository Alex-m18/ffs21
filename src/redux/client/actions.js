/* eslint-disable import/prefer-default-export */
import {
  CHANGE_CLIENT_STATE,
  CLIENT_SEANCE_REQUEST,
  CLIENT_SEANCE_FAILURE,
  CLIENT_SEANCE_SUCCESS,
  CLIENT_CHANGE_SEAT_SELECTION,
} from './types';

export function changeClientState(state = {}) {
  return { type: CHANGE_CLIENT_STATE, payload: state };
}

export function clientSeanceRequest(seanceID) {
  return { type: CLIENT_SEANCE_REQUEST, payload: seanceID };
}

export function clientSeanceFailure(value = true) {
  return { type: CLIENT_SEANCE_FAILURE, payload: value };
}

export function clientSeanceSuccess(value = true) {
  return { type: CLIENT_SEANCE_SUCCESS, payload: value };
}

export function clientChangeSeatSelection({ id, selected }) {
  return { type: CLIENT_CHANGE_SEAT_SELECTION, payload: { id, selected } };
}
