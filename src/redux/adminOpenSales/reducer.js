import {
  ADMIN_OPEN_SALE_CHANGE_HALL,
} from './types';

const initialState = {
  hall: null,
  hallID: '',
};

export default function adminOpenSaleReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_OPEN_SALE_CHANGE_HALL: {
      const hall = action.payload;
      return { ...state, hall, hallID: hall ? hall.id : '' };
    }

    default:
      return state;
  }
}
