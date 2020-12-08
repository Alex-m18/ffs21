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

import { TICKET_REQUEST } from './types';

import {
  ticketFailure,
  ticketSuccess,
} from './actions';

export const ticketRequestEpic = (action$) => action$.pipe(
  ofType(TICKET_REQUEST),
  exhaustMap((o) => {
    const id = o.payload;
    return ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/api/getticket?id=${id}`,
    ).pipe(
      retry(5),
      map((res) => ticketSuccess(res)),
      catchError((e) => of(ticketFailure(e))),
    );
  }),
);
