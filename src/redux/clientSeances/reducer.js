/* eslint-disable object-curly-newline */
import {
  CLIENT_SEANCES_REQUEST,
  CLIENT_SEANCES_FAILURE,
  CLIENT_SEANCES_SUCCESS,
  CLIENT_SEANCES_CLEAR,
} from './types';

const initialState = {
  seances: null,
  loading: false,
  error: null,
};

export default function clientSeancesReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SEANCES_CLEAR:
      return initialState;
    case CLIENT_SEANCES_REQUEST:
      return {
        ...state,
        seances: null,
        loading: true,
        error: null,
      };
    case CLIENT_SEANCES_FAILURE: {
      const error = action.payload;
      return { ...state, loading: false, error };
    }
    case CLIENT_SEANCES_SUCCESS: {
      const seances = action.payload;
      return {
        ...state,
        seances,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
