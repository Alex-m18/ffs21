/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import moment from 'moment';
import {
  CHANGE_CLIENT_STATE,
  CLIENT_SEANCE_REQUEST,
  CLIENT_SEANCE_FAILURE,
  CLIENT_SEANCE_SUCCESS,
  CLIENT_CHANGE_SEAT_SELECTION,
} from './types';

const initialState = {
  chosenDate: moment().startOf('day'),
  chosenSeance: null,
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CLIENT_STATE:
      return { ...state, ...action.payload };
    case CLIENT_CHANGE_SEAT_SELECTION: {
      const { id, selected } = action.payload;
      const newSeats = state.chosenSeance.seats.map((o) => {
        if (o.id === id) o.selected = selected;
        return o;
      });
      return {
        ...state,
        chosenSeance: {
          ...state.chosenSeance,
          seats: newSeats,
        },
      };
    }
    case CLIENT_SEANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CLIENT_SEANCE_FAILURE: {
      const error = action.payload;
      return { ...state, loading: false, error };
    }
    case CLIENT_SEANCE_SUCCESS: {
      const seance = action.payload;
      return {
        ...state,
        chosenSeance: seance,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
