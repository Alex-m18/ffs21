/* eslint-disable import/prefer-default-export */
import {
  ADMIN_HALLS_ADD_FORM_SHOW,
  ADMIN_HALLS_ADD_FORM_HIDE,
  ADMIN_HALLS_ADD_FORM_CHANGE,
  ADMIN_HALLS_REMOVE_FORM_SHOW,
  ADMIN_HALLS_REMOVE_FORM_HIDE,
  ADMIN_HALLS_REMOVE_FORM_CHANGE,
} from './types';

export function adminHallsAddFormShow() {
  return { type: ADMIN_HALLS_ADD_FORM_SHOW };
}

export function adminHallsAddFormHide() {
  return { type: ADMIN_HALLS_ADD_FORM_HIDE };
}

export function adminHallsAddFormChange(data) {
  return { type: ADMIN_HALLS_ADD_FORM_CHANGE, payload: data };
}

export function adminHallsRemoveFormShow() {
  return { type: ADMIN_HALLS_REMOVE_FORM_SHOW };
}

export function adminHallsRemoveFormHide() {
  return { type: ADMIN_HALLS_REMOVE_FORM_HIDE };
}

export function adminHallsRemoveFormChange(data) {
  return { type: ADMIN_HALLS_REMOVE_FORM_CHANGE, payload: data };
}
