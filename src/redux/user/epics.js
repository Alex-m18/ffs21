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

import { USER_LOGIN_REQUEST } from './types';

import {
  userLoginFailure,
  userLoginSuccess,
} from './actions';

export const userLoginRequestEpic = (action$) => action$.pipe(
  ofType(USER_LOGIN_REQUEST),
  exhaustMap((o) => {
    const { email, password } = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ email, password }),
    }).pipe(
      retry(5),
      map((res) => userLoginSuccess(res.response)),
      catchError((e) => of(userLoginFailure(e))),
    );
  }),
);
