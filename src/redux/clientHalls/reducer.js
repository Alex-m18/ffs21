/* eslint-disable object-curly-newline */
import {
  CLIENT_HALLS_REQUEST,
  CLIENT_HALLS_FAILURE,
  CLIENT_HALLS_SUCCESS,
  CLIENT_HALLS_CLEAR,
} from './types';

const initialState = {
  halls: null,
  loading: false,
  error: null,
};

export default function clientHallsReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_HALLS_CLEAR:
      return initialState;
    case CLIENT_HALLS_REQUEST:
      return {
        ...state,
        halls: null,
        loading: true,
        error: null,
      };
    case CLIENT_HALLS_FAILURE: {
      const error = action.payload;
      return { ...state, loading: false, error };
    }
    case CLIENT_HALLS_SUCCESS: {
      const halls = action.payload;
      return {
        ...state,
        halls,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
