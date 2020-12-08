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

import { CLIENT_HALLS_REQUEST } from './types';

import {
  clientHallsFailure,
  clientHallsSuccess,
} from './actions';

export const clientHallsRequestEpic = (action$) => action$.pipe(
  ofType(CLIENT_HALLS_REQUEST),
  exhaustMap((o) => {
    const IDs = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/gethalls`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(IDs),
    }).pipe(
      retry(5),
      map((res) => clientHallsSuccess(res.response)),
      catchError((e) => of(clientHallsFailure(e))),
    );
  }),
);
