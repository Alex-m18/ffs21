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
import { userLogout } from '../user/actions';

export const adminHallsRequestEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_HALLS_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([, state]) => (
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/halls`,
      method: 'GET',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
    }).pipe(
      retry(5),
      map((res) => adminHallsSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminHallsFailure(err));
      }),
    )
  )),
);

export const adminHallsRemoveEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_HALLS_REMOVE_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => {
    const id = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/halls/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
    }).pipe(
      retry(5),
      map(() => adminHallsRemoveSuccess(id)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminHallsRemoveFailure(err, id));
      }),
    );
  }),
);

export const adminHallsAddEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_HALLS_ADD_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/halls`,
      method: 'POST',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminHallsAddSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminHallsAddFailure(err));
      }),
    );
  }),
);

export const adminHallsUpdateEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_HALLS_UPDATE_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/hall`,
      method: 'PUT',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminHallsUpdateSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminHallsUpdateFailure(err));
      }),
    );
  }),
);
