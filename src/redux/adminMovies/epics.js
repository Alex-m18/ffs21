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
  ADMIN_MOVIES_REQUEST, ADMIN_MOVIES_SAVE_REQUEST,
} from './types';

import {
  adminMoviesSuccess,
  adminMoviesFailure,
  adminMoviesSaveSuccess,
  adminMoviesSaveFailure,
} from './actions';

export const adminMoviesRequestEpic = (action$) => action$.pipe(
  ofType(ADMIN_MOVIES_REQUEST),
  exhaustMap(() => (
    ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/movies`,
    ).pipe(
      retry(5),
      map((res) => adminMoviesSuccess(res)),
      catchError((e) => of(adminMoviesFailure(e))),
    )
  )),
);

export const adminMoviesSaveEpic = (action$) => action$.pipe(
  ofType(ADMIN_MOVIES_SAVE_REQUEST),
  exhaustMap((o) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/movies`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      retry(5),
      map((res) => adminMoviesSaveSuccess(res.response)),
      catchError((err) => of(adminMoviesSaveFailure(err))),
    );
  }),
);
