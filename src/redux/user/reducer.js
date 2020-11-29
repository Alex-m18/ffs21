/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGIN_FAILURE: {
      const error = action.payload;
      return { ...state, loading: false, error };
    }
    case USER_LOGIN_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    }
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
