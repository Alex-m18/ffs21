/* eslint-disable object-curly-newline */
import {
  ADMIN_PRICES_CHANGE_HALL,
} from './types';

const initialState = {
  hall: null,
  hallID: '',
};

export default function adminPricesReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_PRICES_CHANGE_HALL: {
      const hall = action.payload;
      return {
        ...state,
        hall,
        hallID: hall ? hall.id : '',
      };
    }
    default:
      return state;
  }
}
