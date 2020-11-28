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
  ADMIN_SEANCES_REQUEST, ADMIN_SEANCES_SAVE_REQUEST,
} from './types';

import {
  adminSeancesSuccess,
  adminSeancesFailure,
  adminSeancesSaveSuccess,
  adminSeancesSaveFailure,
} from './actions';

export const adminSeancesRequestEpic = (action$) => action$.pipe(
  ofType(ADMIN_SEANCES_REQUEST),
  exhaustMap(() => (
    ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/seances`,
    ).pipe(
      retry(5),
      map((res) => adminSeancesSuccess(res)),
      catchError((e) => of(adminSeancesFailure(e))),
    )
  )),
);

export const adminSeancesSaveEpic = (action$) => action$.pipe(
  ofType(ADMIN_SEANCES_SAVE_REQUEST),
  exhaustMap((o) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/seances`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminSeancesSaveSuccess(res.response)),
      catchError((err) => of(adminSeancesSaveFailure(err))),
    );
  }),
);
