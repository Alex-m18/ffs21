import {
  ADMIN_OPEN_SALE_REQUEST,
  ADMIN_OPEN_SALE_SUCCESS,
  ADMIN_OPEN_SALE_SUCCESS_CLEAR,
  ADMIN_OPEN_SALE_FAILURE,
} from './types';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export default function adminOpenSaleReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_OPEN_SALE_REQUEST:
      return { ...initialState, loading: true };

    case ADMIN_OPEN_SALE_SUCCESS:
      return { ...initialState, success: true };

    case ADMIN_OPEN_SALE_SUCCESS_CLEAR:
      return initialState;

    case ADMIN_OPEN_SALE_FAILURE:
      return { ...initialState, error: action.payload };

    default:
      return state;
  }
}
