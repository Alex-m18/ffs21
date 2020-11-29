/* eslint-disable import/prefer-default-export */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import {
  map,
  exhaustMap,
  retry,
  catchError,
  withLatestFrom,
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
import { userLogout } from '../user/actions';

export const adminSeatsRequestEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_SEATS_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => (
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/seats/${o.payload}`,
      method: 'GET',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
    }).pipe(
      retry(5),
      map((res) => adminSeatsSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminSeatsFailure(err));
      }),
    )
  )),
);

export const adminSeatsUpdateEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_SEATS_UPDATE_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/seats`,
      method: 'PUT',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminSeatsUpdateSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminSeatsUpdateFailure(err));
      }),
    );
  }),
);
