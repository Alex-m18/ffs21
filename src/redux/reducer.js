import { combineReducers } from 'redux';
import clientReducer from './client/reducer';
import userReducer from './user/reducer';
import clientSeancesReducer from './clientSeances/reducer';
import clientHallsReducer from './clientHalls/reducer';
import clientMoviesReducer from './clientMovies/reducer';
import paymentReducer from './payment/reducer';
import ticketReducer from './ticket/reducer';
import adminHallsReducer from './adminHalls/reducer';
import adminHallsControlReducer from './adminHallsControl/reducer';
import adminSeatsReducer from './adminSeats/reducer';
import adminPricesReducer from './adminPrices/reducer';
import adminMoviesReducer from './adminMovies/reducer';
import adminSeancesReducer from './adminSeances/reducer';
import adminOpenSaleReducer from './adminOpenSales/reducer';

const reducer = combineReducers({
  halls: adminHallsReducer,
  hallsControl: adminHallsControlReducer,
  seats: adminSeatsReducer,
  prices: adminPricesReducer,
  movies: adminMoviesReducer,
  seances: adminSeancesReducer,
  openSale: adminOpenSaleReducer,
  user: userReducer,
  client: clientReducer,
  clientSeances: clientSeancesReducer,
  clientHalls: clientHallsReducer,
  clientMovies: clientMoviesReducer,
  payment: paymentReducer,
  ticket: ticketReducer,
});

export default reducer;
