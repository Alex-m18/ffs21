/* eslint-disable import/prefer-default-export */
import {
  ADMIN_PRICES_CHANGE_HALL,
} from './types';

export function adminPricesChangeHall(states) {
  return { type: ADMIN_PRICES_CHANGE_HALL, payload: states };
}
