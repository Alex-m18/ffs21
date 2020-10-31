import { combineReducers } from 'redux';
import clientReducer from './client/reducer';
import clientSeancesReducer from './clientSeances/reducer';
import clientHallsReducer from './clientHalls/reducer';
import clientMoviesReducer from './clientMovies/reducer';
import paymentReducer from './payment/reducer';
import ticketReducer from './ticket/reducer';

const reducer = combineReducers({
  client: clientReducer,
  clientSeances: clientSeancesReducer,
  clientHalls: clientHallsReducer,
  clientMovies: clientMoviesReducer,
  payment: paymentReducer,
  ticket: ticketReducer,
});

export default reducer;
