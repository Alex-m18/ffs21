/* eslint-disable object-curly-newline */
import {
  ADMIN_HALLS_REQUEST,
  ADMIN_HALLS_FAILURE,
  ADMIN_HALLS_SUCCESS,
  ADMIN_HALLS_CLEAR,
  ADMIN_HALLS_REMOVE_REQUEST,
  ADMIN_HALLS_REMOVE_SUCCESS,
  ADMIN_HALLS_REMOVE_FAILURE,
  ADMIN_HALLS_ADD_REQUEST,
  ADMIN_HALLS_ADD_SUCCESS,
  ADMIN_HALLS_ADD_FAILURE,
  ADMIN_HALLS_UPDATE_REQUEST,
  ADMIN_HALLS_UPDATE_SUCCESS,
  ADMIN_HALLS_UPDATE_FAILURE,
  ADMIN_HALLS_UPDATE_SUCCESS_CLEAR,
} from './types';

const initialState = {
  data: [],
  loading: false,
  loadingError: null,
  showAddForm: false,
  addFormData: '',
  adding: false,
  addingError: null,
  updating: false,
  updatingError: null,
  updatingSuccess: false,
};

export default function adminHallsReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_HALLS_CLEAR:
      return initialState;
    case ADMIN_HALLS_REQUEST:
      return {
        ...state,
        loading: true,
        loadingError: null,
        adding: false,
        addingError: null,
        updating: false,
        updatingError: null,
        updatingSuccess: false,
      };
    case ADMIN_HALLS_FAILURE: {
      const loadingError = action.payload;
      return { ...state, loading: false, loadingError };
    }
    case ADMIN_HALLS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        loadingError: null,
      };
    }
    case ADMIN_HALLS_REMOVE_REQUEST: {
      const id = action.payload;
      return {
        ...state,
        data: state.data.map((hall) => {
          if (hall.id === id) return { ...hall, removing: true, removingError: null };
          return hall;
        }),
      };
    }
    case ADMIN_HALLS_REMOVE_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        data: state.data.filter((o) => o.id !== id),
      };
    }
    case ADMIN_HALLS_REMOVE_FAILURE: {
      const { err, id } = action.payload;
      return {
        ...state,
        data: state.data.map((hall) => {
          if (hall.id === id) return { ...hall, removing: false, removingError: err };
          return hall;
        }),
      };
    }
    case ADMIN_HALLS_ADD_REQUEST: {
      return {
        ...state,
        adding: true,
        addingError: null,
      };
    }
    case ADMIN_HALLS_ADD_SUCCESS: {
      const { hall } = action.payload;
      return {
        ...state,
        data: [...state.data, hall],
        showAddForm: false,
        addFormData: '',
        adding: false,
        addingError: null,
      };
    }
    case ADMIN_HALLS_ADD_FAILURE: {
      const { err } = action.payload;
      return {
        ...state,
        adding: false,
        addingError: err,
      };
    }
    case ADMIN_HALLS_UPDATE_REQUEST: {
      return {
        ...state,
        updating: true,
        updatingError: null,
        updatingSuccess: false,
      };
    }
    case ADMIN_HALLS_UPDATE_SUCCESS: {
      const { hall } = action.payload;
      return {
        ...state,
        data: state.data.map((o) => {
          if (o.id === hall.id) return hall;
          return o;
        }),
        updating: false,
        updatingError: null,
        updatingSuccess: true,
      };
    }
    case ADMIN_HALLS_UPDATE_FAILURE: {
      const { err } = action.payload;
      return {
        ...state,
        updating: false,
        updatingError: err,
        updatingSuccess: false,
      };
    }
    case ADMIN_HALLS_UPDATE_SUCCESS_CLEAR: {
      return {
        ...state,
        updatingSuccess: false,
      };
    }
    default:
      return state;
  }
}
