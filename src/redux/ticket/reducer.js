/* eslint-disable object-curly-newline */
import {
  TICKET_REQUEST,
  TICKET_FAILURE,
  TICKET_SUCCESS,
  TICKET_CLEAR,
} from './types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function ticketReducer(state = initialState, action) {
  switch (action.type) {
    case TICKET_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case TICKET_FAILURE: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }
    case TICKET_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    }
    case TICKET_CLEAR:
      return initialState;
    default:
      return state;
  }
}
