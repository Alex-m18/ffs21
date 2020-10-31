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

import { CLIENT_MOVIES_REQUEST } from './types';

import {
  clientMoviesFailure,
  clientMoviesSuccess,
} from './actions';

export const clientMoviesRequestEpic = (action$) => action$.pipe(
  ofType(CLIENT_MOVIES_REQUEST),
  exhaustMap((o) => {
    const IDs = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/getmovies`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(IDs),
    }).pipe(
      retry(5),
      map((res) => clientMoviesSuccess(res.response)),
      catchError((e) => of(clientMoviesFailure(e))),
    );
  }),
);
