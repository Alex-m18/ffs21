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
  ADMIN_MOVIES_REQUEST, ADMIN_MOVIES_SAVE_REQUEST,
} from './types';

import {
  adminMoviesSuccess,
  adminMoviesFailure,
  adminMoviesSaveSuccess,
  adminMoviesSaveFailure,
} from './actions';
import { userLogout } from '../user/actions';

export const adminMoviesRequestEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_MOVIES_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([, state]) => (
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/movies`,
      method: 'GET',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
    }).pipe(
      retry(5),
      map((res) => adminMoviesSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminMoviesFailure(err));
      }),
    )
  )),
);

export const adminMoviesSaveEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_MOVIES_SAVE_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([o, state]) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/movies`,
      method: 'POST',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminMoviesSaveSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminMoviesSaveFailure(err));
      }),
    );
  }),
);
