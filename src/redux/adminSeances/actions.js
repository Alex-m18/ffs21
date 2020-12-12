/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  ADMIN_SEANCES_REQUEST,
  ADMIN_SEANCES_FAILURE,
  ADMIN_SEANCES_SUCCESS,
  ADMIN_SEANCES_ADD,
  ADMIN_SEANCES_REMOVE,
  ADMIN_SEANCES_ADD_FORM_SHOW,
  ADMIN_SEANCES_ADD_FORM_HIDE,
  ADMIN_SEANCES_ADD_FORM_CHANGE,
  ADMIN_SEANCES_REMOVE_FORM_SHOW,
  ADMIN_SEANCES_REMOVE_FORM_HIDE,
  ADMIN_SEANCES_REMOVE_FORM_CHANGE,
  ADMIN_SEANCES_SAVE_SUCCESS_CLEAR,
  ADMIN_SEANCES_SAVE_SUCCESS,
  ADMIN_SEANCES_SAVE_REQUEST,
  ADMIN_SEANCES_SAVE_FAILURE,
  ADMIN_SEANCES_CHANGE_DATE,
} from './types';

export const adminSeancesRequest = (id) => ({ type: ADMIN_SEANCES_REQUEST, payload: id });
export const adminSeancesSuccess = (value) => ({ type: ADMIN_SEANCES_SUCCESS, payload: value });
export const adminSeancesFailure = (value) => ({ type: ADMIN_SEANCES_FAILURE, payload: value });

export const adminSeancesAdd = (data) => ({ type: ADMIN_SEANCES_ADD, payload: data });
export const adminSeancesRemove = (data) => ({ type: ADMIN_SEANCES_REMOVE, payload: data });

export const adminSeancesSaveRequest = (data) => ({ type: ADMIN_SEANCES_SAVE_REQUEST, payload: data });
export const adminSeancesSaveSuccess = (data) => ({ type: ADMIN_SEANCES_SAVE_SUCCESS, payload: data });
export const adminSeancesSaveSuccessClear = () => ({ type: ADMIN_SEANCES_SAVE_SUCCESS_CLEAR });
export const adminSeancesSaveFailure = (err) => ({ type: ADMIN_SEANCES_SAVE_FAILURE, payload: { err } });

export const adminSeancesAddFormShow = () => ({ type: ADMIN_SEANCES_ADD_FORM_SHOW });
export const adminSeancesAddFormHide = () => ({ type: ADMIN_SEANCES_ADD_FORM_HIDE });
export const adminSeancesAddFormChange = (data) => ({ type: ADMIN_SEANCES_ADD_FORM_CHANGE, payload: data });

export const adminSeancesRemoveFormShow = () => ({ type: ADMIN_SEANCES_REMOVE_FORM_SHOW });
export const adminSeancesRemoveFormHide = () => ({ type: ADMIN_SEANCES_REMOVE_FORM_HIDE });
export const adminSeancesRemoveFormChange = (data) => ({ type: ADMIN_SEANCES_REMOVE_FORM_CHANGE, payload: data });

export const adminSeancesChangeDate = (data) => ({ type: ADMIN_SEANCES_CHANGE_DATE, payload: data });
