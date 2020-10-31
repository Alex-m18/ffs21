import { combineEpics } from 'redux-observable';
import { clientSeanceRequestEpic } from './client/epics';
import { clientSeancesRequestEpic } from './clientSeances/epics';
import { clientHallsRequestEpic } from './clientHalls/epics';
import { clientMoviesRequestEpic } from './clientMovies/epics';
import { ticketPaymentRequestEpic } from './payment/epics';
import { ticketRequestEpic } from './ticket/epics';

const epic = combineEpics(
  clientSeanceRequestEpic,
  clientSeancesRequestEpic,
  clientHallsRequestEpic,
  clientMoviesRequestEpic,
  ticketPaymentRequestEpic,
  ticketRequestEpic,
);

export default epic;
