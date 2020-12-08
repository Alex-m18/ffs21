/* eslint-disable import/prefer-default-export */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import moment from 'moment';

import {
  map,
  exhaustMap,
  retry,
  catchError,
} from 'rxjs/operators';

import { CLIENT_SEANCES_REQUEST } from './types';

import {
  clientSeancesFailure,
  clientSeancesSuccess,
} from './actions';

export const clientSeancesRequestEpic = (action$) => action$.pipe(
  ofType(CLIENT_SEANCES_REQUEST),
  exhaustMap((o) => {
    const date = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/getseances`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        fromDate: date.toISOString(),
        toDate: moment(date).add(1, 'day').toISOString(),
      }),
    }).pipe(
      retry(5),
      map((res) => clientSeancesSuccess(res.response)),
      catchError((e) => of(clientSeancesFailure(e))),
    );
  }),
);
