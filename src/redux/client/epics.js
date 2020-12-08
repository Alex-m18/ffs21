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

import { CLIENT_SEANCE_REQUEST } from './types';

import {
  clientSeanceFailure,
  clientSeanceSuccess,
} from './actions';

export const clientSeanceRequestEpic = (action$) => action$.pipe(
  ofType(CLIENT_SEANCE_REQUEST),
  exhaustMap((o) => {
    const seanceID = o.payload;
    return ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/api/getseancestate?seanceID=${seanceID}`,
    ).pipe(
      retry(5),
      map((res) => clientSeanceSuccess(res)),
      catchError((e) => of(clientSeanceFailure(e))),
    );
  }),
);
