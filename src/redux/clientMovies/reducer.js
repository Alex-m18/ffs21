/* eslint-disable object-curly-newline */
import {
  CLIENT_MOVIES_REQUEST,
  CLIENT_MOVIES_FAILURE,
  CLIENT_MOVIES_SUCCESS,
  CLIENT_MOVIES_CLEAR,
} from './types';

const initialState = {
  movies: null,
  loading: false,
  error: null,
};

export default function clientMoviesReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_MOVIES_CLEAR:
      return initialState;
    case CLIENT_MOVIES_REQUEST:
      return {
        ...state,
        movies: null,
        loading: true,
        error: null,
      };
    case CLIENT_MOVIES_FAILURE: {
      const error = action.payload;
      return { ...state, loading: false, error };
    }
    case CLIENT_MOVIES_SUCCESS: {
      const movies = action.payload;
      return {
        ...state,
        movies,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
