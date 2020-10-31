/* eslint-disable import/prefer-default-export */
import {
  TICKET_REQUEST,
  TICKET_FAILURE,
  TICKET_SUCCESS,
  TICKET_CLEAR,
} from './types';

export function ticketRequest(id) {
  return { type: TICKET_REQUEST, payload: id };
}

export function ticketFailure(value = true) {
  return { type: TICKET_FAILURE, payload: value };
}

export function ticketSuccess(value = true) {
  return { type: TICKET_SUCCESS, payload: value };
}

export function ticketClear() {
  return { type: TICKET_CLEAR };
}
