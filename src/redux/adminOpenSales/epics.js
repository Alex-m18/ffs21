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
import { userLogout } from '../user/actions';

import { adminOpenSaleFailure, adminOpenSaleSuccess } from './actions';

import { ADMIN_OPEN_SALE_REQUEST } from './types';

export const adminOpenSaleRequestEpic = (action$, state$) => action$.pipe(
  ofType(ADMIN_OPEN_SALE_REQUEST),
  withLatestFrom(state$),
  exhaustMap(([, state]) => (
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/opensales`,
      method: 'GET',
      headers: {
        Authorization: state.user.data.token,
        'Content-Type': 'Application/JSON',
      },
    }).pipe(
      retry(5),
      map((res) => adminOpenSaleSuccess(res.response)),
      catchError((err) => {
        if (err.status === 401) return of(userLogout());
        return of(adminOpenSaleFailure(err));
      }),
    )
  )),
);
