/* eslint-disable object-curly-newline */
import moment from 'moment';

import {
  ADMIN_SEANCES_FAILURE,
  ADMIN_SEANCES_REQUEST,
  ADMIN_SEANCES_SUCCESS,
  ADMIN_SEANCES_ADD,
  ADMIN_SEANCES_REMOVE,
  ADMIN_SEANCES_ADD_FORM_SHOW,
  ADMIN_SEANCES_ADD_FORM_HIDE,
  ADMIN_SEANCES_ADD_FORM_CHANGE,
  ADMIN_SEANCES_REMOVE_FORM_SHOW,
  ADMIN_SEANCES_REMOVE_FORM_HIDE,
  ADMIN_SEANCES_REMOVE_FORM_CHANGE,
  ADMIN_SEANCES_SAVE_REQUEST,
  ADMIN_SEANCES_SAVE_SUCCESS,
  ADMIN_SEANCES_SAVE_FAILURE,
  ADMIN_SEANCES_SAVE_SUCCESS_CLEAR,
} from './types';

const initialState = {
  data: [],
  addForm: {
    show: false,
    data: {
      movieID: '',
      hallID: '',
      date: '',
      fields: [],
    },
  },
  removeForm: {
    show: false,
    data: {
      seance: {
        movieID: '',
        hallID: '',
        date: '',
      },
      title: '',
    },
  },
  loading: false,
  loadingError: null,
  saving: false,
  savingError: null,
  savingSuccess: false,
};

export default function adminSeancesReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SEANCES_REQUEST:
      return { ...state, loading: true, loadingError: null };
    case ADMIN_SEANCES_FAILURE:
      return { ...state, loading: false, loadingError: action.payload };
    case ADMIN_SEANCES_SUCCESS:
      return { ...state, data: action.payload, loading: false, loadingError: null };

    case ADMIN_SEANCES_ADD: {
      const data = action.payload;
      const date = moment(data.date, 'DD.MM.YYYY, HH:mm');
      if (!date.isValid() || moment().isAfter(date)) return state;
      const movie = {
        movieID: data.movieID,
        hallID: data.hallID,
        date: date.toISOString(),
      };
      return {
        ...state,
        data: [...state.data, movie].sort((a, b) => (
          moment(a.date).isAfter(moment(b.date)) ? 1 : -1
        )),
        addForm: initialState.addForm,
      };
    }

    case ADMIN_SEANCES_REMOVE: {
      const seance = action.payload;
      if (!seance) return state;
      if (seance.id) {
        return {
          ...state,
          data: state.data.map((o) => {
            if (o.id === seance.id) return { ...o, removed: true };
            return o;
          }),
        };
      }
      return {
        ...state,
        data: state.data.filter((o) => !(
          o.movieID === seance.movieID
          && o.hallID === seance.hallID
          && o.date === seance.date
        )),
      };
    }

    case ADMIN_SEANCES_SAVE_REQUEST:
      return { ...state, saving: true, savingError: null, savingSuccess: false };
    case ADMIN_SEANCES_SAVE_SUCCESS:
      return {
        ...state,
        data: action.payload.seances,
        saving: false,
        savingError: null,
        savingSuccess: true,
      };
    case ADMIN_SEANCES_SAVE_FAILURE:
      return { ...state, saving: false, savingError: action.payload.err };
    case ADMIN_SEANCES_SAVE_SUCCESS_CLEAR:
      return { ...state, savingSuccess: false };

    case ADMIN_SEANCES_ADD_FORM_SHOW:
      return { ...state, addForm: { ...state.addForm, show: true } };
    case ADMIN_SEANCES_ADD_FORM_HIDE:
      return { ...state, addForm: { ...state.addForm, show: false } };
    case ADMIN_SEANCES_ADD_FORM_CHANGE:
      return {
        ...state,
        addForm: {
          ...state.addForm,
          data: { ...state.addForm.data, ...action.payload },
        },
      };

    case ADMIN_SEANCES_REMOVE_FORM_SHOW:
      return { ...state, removeForm: { ...state.removeForm, show: true } };
    case ADMIN_SEANCES_REMOVE_FORM_HIDE:
      return { ...state, removeForm: { ...state.removeForm, show: false } };
    case ADMIN_SEANCES_REMOVE_FORM_CHANGE:
      return {
        ...state,
        removeForm: {
          ...state.removeForm,
          ...action.payload,
          data: { ...state.removeForm.data, ...action.payload.data },
        },
      };

    default:
      return state;
  }
}
