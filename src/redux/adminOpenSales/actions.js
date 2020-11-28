/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  ADMIN_OPEN_SALE_REQUEST,
  ADMIN_OPEN_SALE_SUCCESS,
  ADMIN_OPEN_SALE_SUCCESS_CLEAR,
  ADMIN_OPEN_SALE_FAILURE,
} from './types';

export const adminOpenSaleRequest = () => ({ type: ADMIN_OPEN_SALE_REQUEST });
export const adminOpenSaleSuccess = (data) => ({ type: ADMIN_OPEN_SALE_SUCCESS, payload: data });
export const adminOpenSaleSuccessClear = () => ({ type: ADMIN_OPEN_SALE_SUCCESS_CLEAR });
export const adminOpenSaleFailure = (err) => ({ type: ADMIN_OPEN_SALE_FAILURE, payload: { err } });
