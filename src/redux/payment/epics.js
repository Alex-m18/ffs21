/* eslint-disable import/prefer-default-export */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import {
  map,
  exhaustMap,
  retry,
  catchError,
} from 'rxjs/operators';

import { TICKET_PAYMENT_REQUEST } from './types';

import {
  ticketPaymentFailure,
  ticketPaymentSuccess,
} from './actions';

export const ticketPaymentRequestEpic = (action$) => action$.pipe(
  ofType(TICKET_PAYMENT_REQUEST),
  exhaustMap((o) => {
    const seatIDs = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/payment`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(seatIDs),
    }).pipe(
      retry(5),
      map((res) => ticketPaymentSuccess(res.response)),
      catchError((e) => of(ticketPaymentFailure(e))),
    );
  }),
);
