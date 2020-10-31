require('dotenv').config();
const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const moment = require('moment');
const logger = require('koa-logger');
const uuid = require('uuid').v4;

const sqlite3 = require('sqlite3').verbose();
const Movies = require('./app/models/Movies');
const Halls = require('./app/models/Halls');
const Prices = require('./app/models/Prices');
const Seats = require('./app/models/Seats');
const Seances = require('./app/models/Seances');
const SeatStates = require('./app/models/SeatStates');
const Tickets = require('./app/models/Tickets');
const Model = require('./app/models/Model');

const db = new sqlite3.Database(process.env.DATABASE_URL, (err) => {
  if (err) return console.error(err.message);
});

const movies = new Movies(db);
const halls = new Halls(db);
const prices = new Prices(db);
const seats = new Seats(db);
const seances = new Seances(db);
const seatStates = new SeatStates(db);
const tickets = new Tickets(db);

const itemBasicMapper = item => ({
  id: item.id,
  category: item.category,
  title: item.title,
  price: item.price,
  images: item.images,
});

const randomNumber = (start, stop) => {
  return Math.floor(Math.random() * (stop - start + 1)) + start;
}
const fortune = (ctx, body = null, status = 200) => {
    // Uncomment for delay
    // const delay = randomNumber(0, 10) * 25;
    const delay = 0;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Uncomment for error generation
            // if (Math.random() > 0.8) {
            //     reject(new Error('Something bad happened'));
            //     return;
            // }

            ctx.response.status = status;
            ctx.response.body = body;
            resolve();
        }, delay);
    })
}

const app = new Koa();
app.use(logger());
app.use(cors());
app.use(koaBody({
    json: true,
}));

const router = new Router();

router.get('/api/getseancestate', async (ctx, next) => {
  const { seanceID } = ctx.request.query;
  if (!seanceID) return;

  const seance = await seances.findByID(seanceID);
  if (!seance) return;
  if (seance.state === 'closed' || moment(seance.date).isBefore(moment())) {
    return fortune(ctx, { state: 'closed' });
  }

  const movie = await movies.findByID(seance.movieID);
  if (!movie) return;

  const hall = await halls.findByID(seance.hallID);
  if (!hall) return;

  const moviePrices = await prices.all([], 'movieID', Model.EQUAL, seance.movieID);
  const price = moviePrices.find((o) => o.hallID === seance.hallID);
  if (!price) return;

  const seanceSeatStates = await seatStates.all([], 'seanceID', Model.EQUAL, seance.id)

  const seanceSeats = [];
  for (let seanceSeatState of seanceSeatStates) {
    const seat = await seats.findByID(seanceSeatState.seatID);
    seanceSeats.push({
      id: seanceSeatState.id,
      state: seanceSeatState.state,
      number: seat.number,
      row: seat.row,
      column: seat.column,
    });
  }

  return fortune(ctx, {
    id: seance.id,
    movie,
    hall,
    price: price.standart,
    priceVip: price.vip,
    seats: seanceSeats,
  });
});

router.post('/api/getseances', async (ctx, next) => {
  const { fromDate, toDate } = ctx.request.body;
  if (!fromDate || !toDate) return;

  const fromDateSeances = await seances.all([], 'date', Model.BIGGER, fromDate);
  const resultSeances = fromDateSeances.filter((o) => (
    moment(o.date).isBefore(moment(toDate)) && o.state === 'open'
  ));

  return fortune(ctx, resultSeances);
});

router.post('/api/getmovies', async (ctx, next) => {
  const IDs = ctx.request.body || [];
  const results = [];
  for (let id of IDs) {
    results.push(await movies.findByID(id));
  }
  return fortune(ctx, results);
});

router.post('/api/gethalls', async (ctx, next) => {
  const IDs = ctx.request.body || [];
  const results = [];
  for (let id of IDs) {
    results.push(await halls.findByID(id));
  }
  return fortune(ctx, results);
});

router.post('/api/payment', async (ctx, next) => {
  const IDs = ctx.request.body;
  if (!IDs) return fortune(ctx, 'Bad Request', 400);

  const paymentSeatStates = [];
  for (let id of IDs) {
    paymentSeatStates.push(await seatStates.findByID(id));
  }
  
  const seance = await seances.findByID(paymentSeatStates[0].seanceID);
  if (!paymentSeatStates.every((seatState) => {
    if (!seatState) return false;
    if (seatState.seanceID !== seance.id) return false;
    if (['taken', 'closed'].includes(seatState.state)) return false;
    return true;
  })) {
    return fortune(ctx, 'Bad Request', 400);
  }

  const ticketPrices = [];
  for (let seatState of paymentSeatStates) {
    const ticketPrice = await prices.findByMovieHall(seance.movieID, seance.hallID);
    ticketPrices.push(ticketPrice[seatState.state]);
  }

  const newTicket = {
    id: uuid(),
    date: moment().toISOString(),
    price: ticketPrices.reduce((acc, cur) => acc + cur),
  };

  const result = await tickets.push([newTicket])
    .then(() => paymentSeatStates.map((o) => ({ id: o.id, state: 'taken', ticketID: newTicket.id })))
    .then((paymentSeatStates) => seatStates.update(paymentSeatStates))
    .then(() => ({ id: newTicket.id }));

  return fortune(ctx, result);
});

router.get('/api/getticket', async (ctx, next) => {
  const { id } = ctx.request.query;
  if (!id) return;

  const ticket = await tickets.findByID(id);
  if (!ticket) return fortune(ctx, 'Not found', 404);

  const ticketSeatStates = await seatStates.all(
    [],
    'ticketID',
    Model.EQUAL,
    ticket.id,
  );

  const seance = await seances.find([], 'id', Model.EQUAL, ticketSeatStates[0].seanceID);

  const movie = await movies.findByID(seance.movieID);
  const hall = await halls.findByID(seance.hallID);

  const ticketSeats = [];
  for (let ticketSeatState of ticketSeatStates) {
    ticketSeats.push(await seats.findByID(ticketSeatState.seatID));
  }

  const ticketSeatNumbers = ticketSeats.map((o) => o.number).sort((a, b) => a - b);

  const data = {
    movie: {
      title: movie.title,
      date: seance.date,
    },
    hall: {
      title: hall.title,
    },
    seats: ticketSeatNumbers,
  }

  return fortune(ctx, data);
});

app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
