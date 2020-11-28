/* eslint-disable object-curly-newline */
import {
  ADMIN_MOVIES_FAILURE,
  ADMIN_MOVIES_REQUEST,
  ADMIN_MOVIES_SUCCESS,
  ADMIN_MOVIES_ADD,
  ADMIN_MOVIES_ADD_FORM_SHOW,
  ADMIN_MOVIES_ADD_FORM_HIDE,
  ADMIN_MOVIES_ADD_FORM_CHANGE,
  ADMIN_MOVIES_SAVE_REQUEST,
  ADMIN_MOVIES_SAVE_SUCCESS,
  ADMIN_MOVIES_SAVE_FAILURE,
  ADMIN_MOVIES_SAVE_SUCCESS_CLEAR,
  ADMIN_MOVIES_SUCCESS_CLEAR,
} from './types';

const initialState = {
  data: [],
  addForm: {
    show: false,
    data: {
      title: '',
      description: '',
      origin: '',
      duration: 90,
    },
  },
  loading: false,
  loadingError: null,
  loadingSuccess: false,
  saving: false,
  savingError: null,
  savingSuccess: false,
};

export default function adminMoviesReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_MOVIES_REQUEST:
      return { ...state, loading: true, loadingError: null, loadingSuccess: false };
    case ADMIN_MOVIES_FAILURE:
      return { ...state, loading: false, loadingError: action.payload, loadingSuccess: false };
    case ADMIN_MOVIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loadingError: null,
        loadingSuccess: true,
      };
    case ADMIN_MOVIES_SUCCESS_CLEAR:
      return { ...state, loadingSuccess: false };

    case ADMIN_MOVIES_ADD:
      return {
        ...state,
        data: [...state.data, action.payload],
        addForm: initialState.addForm,
      };

    case ADMIN_MOVIES_SAVE_REQUEST:
      return { ...state, saving: true, savingError: null, savingSuccess: false };
    case ADMIN_MOVIES_SAVE_SUCCESS:
      return {
        ...state,
        data: action.payload.movies,
        saving: false,
        savingError: null,
        savingSuccess: true,
      };
    case ADMIN_MOVIES_SAVE_FAILURE:
      return { ...state, saving: false, savingError: action.payload.err };
    case ADMIN_MOVIES_SAVE_SUCCESS_CLEAR:
      return { ...state, savingSuccess: false };

    case ADMIN_MOVIES_ADD_FORM_SHOW:
      return { ...state, addForm: { ...state.addForm, show: true } };
    case ADMIN_MOVIES_ADD_FORM_HIDE:
      return { ...state, addForm: { ...state.addForm, show: false } };
    case ADMIN_MOVIES_ADD_FORM_CHANGE:
      return {
        ...state,
        addForm: {
          ...state.addForm,
          data: { ...state.addForm.data, ...action.payload },
        },
      };
    default:
      return state;
  }
}
