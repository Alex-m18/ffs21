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
  ADMIN_HALLS_REQUEST,
  ADMIN_HALLS_REMOVE_REQUEST,
  ADMIN_HALLS_ADD_REQUEST,
  ADMIN_HALLS_UPDATE_REQUEST,
} from './types';

import {
  adminHallsAddFailure,
  adminHallsAddSuccess,
  adminHallsFailure,
  adminHallsRemoveFailure,
  adminHallsRemoveSuccess,
  adminHallsSuccess,
  adminHallsUpdateFailure,
  adminHallsUpdateSuccess,
} from './actions';

export const adminHallsRequestEpic = (action$) => action$.pipe(
  ofType(ADMIN_HALLS_REQUEST),
  exhaustMap(() => (
    ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/halls`,
    ).pipe(
      retry(5),
      map((res) => adminHallsSuccess(res)),
      catchError((e) => of(adminHallsFailure(e))),
    )
  )),
);

export const adminHallsRemoveEpic = (action$) => action$.pipe(
  ofType(ADMIN_HALLS_REMOVE_REQUEST),
  exhaustMap((o) => {
    const id = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/halls/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      // body: JSON.stringify(id),
    }).pipe(
      retry(5),
      map(() => adminHallsRemoveSuccess(id)),
      catchError((e) => of(adminHallsRemoveFailure(e, id))),
    );
  }),
);

export const adminHallsAddEpic = (action$) => action$.pipe(
  ofType(ADMIN_HALLS_ADD_REQUEST),
  exhaustMap((o) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/halls`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminHallsAddSuccess(res.response)),
      catchError((err) => of(adminHallsAddFailure(err))),
    );
  }),
);

export const adminHallsUpdateEpic = (action$) => action$.pipe(
  ofType(ADMIN_HALLS_UPDATE_REQUEST),
  exhaustMap((o) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/hall`,
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminHallsUpdateSuccess(res.response)),
      catchError((err) => of(adminHallsUpdateFailure(err))),
    );
  }),
);
