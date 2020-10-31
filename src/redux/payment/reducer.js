/* eslint-disable object-curly-newline */
import {
  TICKET_PAYMENT_REQUEST,
  TICKET_PAYMENT_FAILURE,
  TICKET_PAYMENT_SUCCESS,
  TICKET_PAYMENT_CLEAR,
} from './types';

const initialState = {
  id: null,
  loading: false,
  error: null,
};

export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case TICKET_PAYMENT_REQUEST:
      return {
        ...state,
        id: null,
        loading: true,
        error: null,
      };
    case TICKET_PAYMENT_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    }
    case TICKET_PAYMENT_SUCCESS: {
      const { id } = action.payload;
      return {
        ...state,
        id,
        paymentLoading: false,
        error: null,
      };
    }
    case TICKET_PAYMENT_CLEAR:
      return initialState;
    default:
      return state;
  }
}
