import { combineEpics } from 'redux-observable';
import { clientSeanceRequestEpic } from './client/epics';
import { clientSeancesRequestEpic } from './clientSeances/epics';
import { clientHallsRequestEpic } from './clientHalls/epics';
import { clientMoviesRequestEpic } from './clientMovies/epics';
import { ticketPaymentRequestEpic } from './payment/epics';
import { ticketRequestEpic } from './ticket/epics';
import {
  adminHallsRequestEpic,
  adminHallsRemoveEpic,
  adminHallsAddEpic,
  adminHallsUpdateEpic,
} from './adminHalls/epics';
import { adminSeatsRequestEpic, adminSeatsUpdateEpic } from './adminSeats/epics';
import { adminMoviesSaveEpic, adminMoviesRequestEpic } from './adminMovies/epics';
import { adminSeancesRequestEpic, adminSeancesSaveEpic } from './adminSeances/epics';
import { userLoginRequestEpic } from './user/epics';

const epic = combineEpics(
  clientSeanceRequestEpic,
  clientSeancesRequestEpic,
  clientHallsRequestEpic,
  clientMoviesRequestEpic,
  ticketPaymentRequestEpic,
  ticketRequestEpic,
  adminHallsRequestEpic,
  adminHallsRemoveEpic,
  adminHallsAddEpic,
  adminHallsUpdateEpic,
  adminSeatsRequestEpic,
  adminSeatsUpdateEpic,
  adminMoviesRequestEpic,
  adminMoviesSaveEpic,
  adminSeancesRequestEpic,
  adminSeancesSaveEpic,
  userLoginRequestEpic,
);

export default epic;
