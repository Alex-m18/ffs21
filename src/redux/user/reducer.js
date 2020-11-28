/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from './types';

const initialState = {
  user: null,
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
      const user = action.payload;
      return {
        ...state,
        user,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
