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

import {
  ADMIN_SEATS_REQUEST, ADMIN_SEATS_UPDATE_REQUEST,
} from './types';

import {
  adminSeatsSuccess,
  adminSeatsFailure,
  adminSeatsUpdateSuccess,
  adminSeatsUpdateFailure,
} from './actions';

export const adminSeatsRequestEpic = (action$) => action$.pipe(
  ofType(ADMIN_SEATS_REQUEST),
  exhaustMap((o) => (
    ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/seats/${o.payload}`,
    ).pipe(
      retry(5),
      map((res) => adminSeatsSuccess(res)),
      catchError((e) => of(adminSeatsFailure(e))),
    )
  )),
);

export const adminSeatsUpdateEpic = (action$) => action$.pipe(
  ofType(ADMIN_SEATS_UPDATE_REQUEST),
  exhaustMap((o) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/seats`,
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminSeatsUpdateSuccess(res.response)),
      catchError((err) => of(adminSeatsUpdateFailure(err))),
    );
  }),
);
