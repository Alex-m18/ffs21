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
  ADMIN_SEANCES_REQUEST, ADMIN_SEANCES_SAVE_REQUEST,
} from './types';

import {
  adminSeancesSuccess,
  adminSeancesFailure,
  adminSeancesSaveSuccess,
  adminSeancesSaveFailure,
} from './actions';
import { userLogout } from '../user/actions';

export const adminSeancesRequestEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_SEANCES_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([, state]) => (
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/seances`,
      method: 'GET',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
    }).pipe(
      retry(5),
      map((res) => adminSeancesSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminSeancesFailure(err));
      }),
    )
  )),
);

export const adminSeancesSaveEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_SEANCES_SAVE_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/seances`,
      method: 'POST',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminSeancesSaveSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminSeancesSaveFailure(err));
      }),
    );
  }),
);
