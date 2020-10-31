/* eslint-disable import/prefer-default-export */
import {
  TICKET_PAYMENT_REQUEST,
  TICKET_PAYMENT_FAILURE,
  TICKET_PAYMENT_SUCCESS,
  TICKET_PAYMENT_CLEAR,
} from './types';

export function ticketPaymentRequest(seatIDs = []) {
  return { type: TICKET_PAYMENT_REQUEST, payload: seatIDs };
}

export function ticketPaymentFailure(value = true) {
  return { type: TICKET_PAYMENT_FAILURE, payload: value };
}

export function ticketPaymentSuccess(value = true) {
  return { type: TICKET_PAYMENT_SUCCESS, payload: value };
}

export function ticketPaymentClear() {
  return { type: TICKET_PAYMENT_CLEAR };
}
