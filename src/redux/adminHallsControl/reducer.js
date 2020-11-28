/* eslint-disable object-curly-newline */
import {
  ADMIN_HALLS_ADD_FORM_SHOW,
  ADMIN_HALLS_ADD_FORM_HIDE,
  ADMIN_HALLS_ADD_FORM_CHANGE,
  ADMIN_HALLS_REMOVE_FORM_SHOW,
  ADMIN_HALLS_REMOVE_FORM_HIDE,
  ADMIN_HALLS_REMOVE_FORM_CHANGE,
} from './types';

const initialState = {
  showAddForm: false,
  showRemoveForm: false,
  addFormData: { title: '' },
  removeFormData: { id: '', title: '' },
};

export default function adminHallsReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_HALLS_ADD_FORM_SHOW:
      return { ...state, showAddForm: true };

    case ADMIN_HALLS_ADD_FORM_HIDE:
      return { ...state, showAddForm: false };

    case ADMIN_HALLS_ADD_FORM_CHANGE:
      return { ...state, addFormData: action.payload };

    case ADMIN_HALLS_REMOVE_FORM_SHOW:
      return { ...state, showRemoveForm: true };

    case ADMIN_HALLS_REMOVE_FORM_HIDE:
      return { ...state, showRemoveForm: false };

    case ADMIN_HALLS_REMOVE_FORM_CHANGE:
      return { ...state, removeFormData: action.payload };

    default:
      return state;
  }
}
