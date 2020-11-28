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

import { adminOpenSaleFailure, adminOpenSaleSuccess } from './actions';

import { ADMIN_OPEN_SALE_REQUEST } from './types';

export const adminOpenSaleRequestEpic = (action$) => action$.pipe(
  ofType(ADMIN_OPEN_SALE_REQUEST),
  exhaustMap(() => (
    ajax.getJSON(
      `${process.env.REACT_APP_BACKEND_URL}/opensales`,
    ).pipe(
      retry(5),
      map((res) => adminOpenSaleSuccess(res)),
      catchError((e) => of(adminOpenSaleFailure(e))),
    )
  )),
);
