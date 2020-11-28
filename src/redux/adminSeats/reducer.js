/* eslint-disable object-curly-newline */
import {
  ADMIN_SEATS_CHANGE_HALL,
  ADMIN_SEATS_CHANGE_STATES,
  ADMIN_SEATS_FAILURE,
  ADMIN_SEATS_REQUEST,
  ADMIN_SEATS_SUCCESS,
  ADMIN_SEATS_UPDATE_FAILURE,
  ADMIN_SEATS_UPDATE_REQUEST,
  ADMIN_SEATS_UPDATE_SUCCESS,
  ADMIN_SEATS_UPDATE_SUCCESS_CLEAR,
} from './types';

const initialState = {
  hall: null,
  hallID: '',
  states: [],
  loading: false,
  loadingError: null,
  updating: false,
  updatingError: null,
  updatingSuccess: false,
};

export default function adminSeatsReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_SEATS_CHANGE_HALL: {
      const hall = action.payload;
      return {
        ...state,
        hall,
        hallID: hall ? hall.id : '',
      };
    }
    case ADMIN_SEATS_CHANGE_STATES: {
      const states = action.payload;
      return {
        ...state,
        states,
      };
    }
    case ADMIN_SEATS_REQUEST:
      return {
        ...state,
        loading: true,
        loadingError: null,
      };
    case ADMIN_SEATS_FAILURE: {
      const loadingError = action.payload;
      return {
        ...state,
        loading: false,
        loadingError,
      };
    }
    case ADMIN_SEATS_SUCCESS: {
      const states = action.payload;
      return {
        ...state,
        states,
        loading: false,
        loadingError: null,
      };
    }
    case ADMIN_SEATS_UPDATE_REQUEST: {
      return {
        ...state,
        updating: true,
        updatingError: null,
        updatingSuccess: false,
      };
    }
    case ADMIN_SEATS_UPDATE_SUCCESS: {
      return {
        ...state,
        updating: false,
        updatingError: null,
        updatingSuccess: true,
      };
    }
    case ADMIN_SEATS_UPDATE_FAILURE: {
      const { err } = action.payload;
      return {
        ...state,
        updating: false,
        updatingError: err,
        updatingSuccess: false,
      };
    }
    case ADMIN_SEATS_UPDATE_SUCCESS_CLEAR: {
      return {
        ...state,
        updatingSuccess: false,
      };
    }
    default:
      return state;
  }
}
