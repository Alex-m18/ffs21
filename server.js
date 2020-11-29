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

process.env.PASETO_KEY = fs.readFileSync('./paseto_private.key');

const sqlite3 = require('sqlite3').verbose();
const Users = require('./app/models/Users');
const Tokens = require('./app/models/Tokens');
const Movies = require('./app/models/Movies');
const Halls = require('./app/models/Halls');
const Seats = require('./app/models/Seats');
const Seances = require('./app/models/Seances');
const SeatStates = require('./app/models/SeatStates');
const Tickets = require('./app/models/Tickets');
const Model = require('./app/models/Model');

const db = new sqlite3.Database(process.env.DATABASE_URL, (err) => {
  if (err) return console.error(err.message);
  db.exec('PRAGMA foreign_keys = ON;');
});

const users = new Users(db);
const tokens = new Tokens(db);
const movies = new Movies(db);
const halls = new Halls(db);
const seats = new Seats(db);
const seances = new Seances(db);
const seatStates = new SeatStates(db);
const tickets = new Tickets(db);

const userMapper = user => ({
  id: user.id,
  username: user.username,
  email: user.email,
});

const fortune = require('./app/fortune');

const app = new Koa();
app.use(logger());
app.use(cors());
app.use(koaBody({
  json: true,
}));

const router = new Router();

router.post('/api/login', async (ctx, next) => {
  const { email, password } = ctx.request.body;
  if (!email || !password) return false;

  const user = await users.find([], 'email', Model.EQUAL, email);
  if (!user) return false;

  const pwdCorrect = await users.verifyPassword({ ...user, password });
  if (!pwdCorrect) return false;

  const token = await users.getToken(user);
  tokens.push([{ token, userID: user.id }]);

  return fortune(ctx, { ...userMapper(user), token });
});

const auth = async (ctx, next) => {
  try {
    const tokenString = ctx.headers.authorization;
    const reqUser = await users.verifyToken(tokenString);
    if (!reqUser) throw {};
    const user = await users.findByID(reqUser.id);
    if (user.role !== 'admin') throw {};
    return next();
  } catch {
    ctx.response.status = 401;
  }
};

router.get('/api/opensales', auth, async (ctx, next) => {
  const result = await seances.all([], 'state', Model.EQUAL, 'closed')
    .then((closed) => seances.update(closed.map((o) => ({ ...o, state: 'open' }))))
    .then(() => ({ success: true }));
  ctx.status = 204;
  return fortune(ctx, result);
});

router.get('/api/seats/:id', auth, async (ctx, next) => {
  const { id } = ctx.params;
  const hall = await halls.findByID(id);
  if (!hall) return;
  const hallSeats = await seats.all([], 'hallID', Model.EQUAL, hall.id);
  if (!hallSeats) return;
  ctx.status = 204;
  return fortune(ctx, hallSeats);
});

router.put('/api/seats', auth, async (ctx, next) => {
  if (!ctx.request.body) return;
  const newSeatsRaw = ctx.request.body;
  if (!newSeatsRaw || !Array.isArray(newSeatsRaw) || !newSeatsRaw.length) return;
  const newSeats = newSeatsRaw.map((o) => ({
    id: o.id,
    number: o.number,
    row: o.row,
    column: o.column,
    type: o.type,
    hallID: o.hallID,
  }));
  const success = await new Promise(async (resolve, reject) => {
    const promises = [];
    const oldSeats = await seats.all([], 'hallID', Model.EQUAL, newSeats[0].hallID);
    const ids = newSeats.map((o) => o.id);
    const seatsToRemove = oldSeats.filter((o) => !ids.includes(o.id));
    promises.push(seats.delete(seatsToRemove));
    for (let seat of newSeats) {
      if (seat.id) {
        promises.push(seats.update([seat]));
      } else {
        promises.push(seats.push([seat]));
      }
    }
    Promise.all(promises)
      .then(() => resolve({ success: true }))
      .catch((err) => reject({ success: false, err }));
  });

  ctx.status = 204;
  return fortune(ctx, { success });
});

router.get('/api/seances', auth, async (ctx, next) => {
  return fortune(ctx, await seances.all([], 'date', Model.BIGGER, moment().toISOString(), 'date'));
});

router.post('/api/seances', auth, async (ctx, next) => {
  const { body } = ctx.request;
  if (!body) return;

  if (!Array.isArray(body)) return;
  const reqSeances = body.map((o) => ({
    id: o.id,
    movieID: o.movieID,
    hallID: o.hallID,
    date: o.date,
    removed: o.removed,
  }));
  const seancesToAdd = reqSeances.filter((o) => (
    !o.id && o.movieID && o.hallID && o.date && !o.removed
  ));
  const seancesToRemove = reqSeances.filter((o) => o.id && o.removed);

  const newSeances = seancesToAdd.map((o) => ({
    id: uuid(),
    movieID: o.movieID,
    hallID: o.hallID,
    date: o.date,
    state: 'closed',
  }));

  const result = await seances
    .push(newSeances)
    .then(async () => {
      const data = [];
      for (let seance of newSeances) {
        const seanceID = seance.id;
        const { hallID } = seance;
        const seanceSeats = await seats.all(['id', 'type'], 'hallID', Model.EQUAL, hallID); 
        for (let seat of seanceSeats) {
          data.push({
            id: uuid(),
            state: seat.type,
            seatID: seat.id,
            seanceID,
          });
        };
      }
      return seatStates.push(data);
    })
    .then(() => seances.delete(seancesToRemove))
    .then(() => seances.all([], 'date', Model.BIGGER, moment().toISOString(), 'date'))
    .then((seances) => ({ success: true, seances }))
    .catch((err) => err);

  ctx.status = 204;
  return fortune(ctx, result);
});

router.get('/api/movies', auth, async (ctx, next) => {
  return fortune(ctx, await movies.all());
});

router.post('/api/movies', auth, async (ctx, next) => {
  const { body } = ctx.request;
  if (!body) return;

  if (!Array.isArray(body)) return;
  const reqMovies = body.map((o) => ({
    id: o.id,
    title: o.title,
    description: o.description,
    origin: o.origin,
    duration: o.duration,
    posterTitle: o.posterTitle,
    posterLink: o.posterLink,
  })).filter((o) => (
    !o.id && o.title && o.description && o.origin && o.duration
  ));

  const result = await movies
    .push(reqMovies.map((o) => ({ ...o, id: uuid() })))
    .then(() => movies.all())
    .then((movies) => ({ success: true, movies }))
    .catch((err) => err);
  
  ctx.status = 204;
  return fortune(ctx, result);
});

router.get('/api/halls', auth, async (ctx, next) => {
  return fortune(ctx, await halls.all());
});

router.delete('/api/halls/:id', auth, async (ctx, next) => {
  const { id } = ctx.params;
  ctx.status = 204;
  return fortune(ctx, await halls.delete([{ id }]));
});

router.put('/api/hall', auth, async (ctx, next) => {
  if (!ctx.request.body) return;
  const {
    id,
    title,
    rows,
    cols,
    price,
    priceVip,
  } = ctx.request.body;
  if (!id || !title || !rows || !cols || !price || !priceVip) return;

  const hall = await halls
    .update([{ id, title, rows, cols, price, priceVip }])
    .then(() => halls.findByID(id))
    .catch((err) => err);

  ctx.status = 204;
  return fortune(ctx, { success: true, hall });
});

router.post('/api/halls', auth, async (ctx, next) => {
  if (!ctx.request.body) return;
  const { title } = ctx.request.body;
  if (!title) return;
  const id = uuid();

  const hall = await halls
    .push([{ id, title }])
    .then(() => halls.findByID(id))
    .catch((err) => err);

  const data = [];
  const { rows, cols } = hall;
  for (let row = 1; row <= rows; row += 1) {
    for (let column = 1; column <= cols; column += 1) {
      const isVip = (row > rows * 0.2) && (row < rows * 0.6)
      && (column > cols * 0.3) && (column < cols * 0.8);
      data.push({
        number: row * 100 + column,
        row,
        column,
        type: isVip ? 'vip' : 'standart',
        hallID: id,
      });
    }
  }
  await seats.push(data);

  ctx.status = 204;
  return fortune(ctx, { success: true, hall });
});

router.post('/api/gethalls', async (ctx, next) => {
  const IDs = ctx.request.body || [];
  const results = [];
  for (let id of IDs) {
    results.push(await halls.findByID(id));
  }
  return fortune(ctx, results);
});

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
    date: seance.date,
    movie,
    hall,
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
    const hall = await halls.findByID(seance.hallID)
    const ticketPrice = seatState.state === 'vip' ? hall.priceVip : hall.price;
    ticketPrices.push(ticketPrice);
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

console.log(`Server is listening on port ${port}`);
