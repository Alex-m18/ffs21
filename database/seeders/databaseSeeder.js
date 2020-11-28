require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const userSeeder = require('./userSeeder');
const movieSeeder = require('./movieSeeder');
const hallSeeder = require('./hallSeeder');
const seanceSeeder = require('./seanceSeeder');
const seatSeeder = require('./seatSeeder');
const seatSeanceSeeder = require('./seatSeanceSeeder');
const ticketSeeder = require('./ticketSeeder');

const seeds = [
  userSeeder,
  movieSeeder,
  hallSeeder,
  seanceSeeder,
  seatSeeder,
  seatSeanceSeeder,
  ticketSeeder,
];

const db = new sqlite3.Database(process.env.DATABASE_URL, (err) => {
  if (err) return console.error(err.message);
});

const closeDB = (db) => new Promise((resolve, reject) => {
  db.close((err) => {
    if (err) reject(err);
    resolve();
  });
});

function* seedDatabase(db) {
  for (let i = 0; i < seeds.length; i += 1) {
    yield seeds[i].run(db)
      .then((changes) => {
        const count = Array.isArray(changes) ? changes.length : changes
        console.log(`[INFO] ${seeds[i].name}: Rows inserted ${count}`)
      })
    }
  yield closeDB(db);
}

function execute(gen, yieldValue) {
  let next = gen.next(yieldValue);
  if (!next.done) {
    return next.value.then(
      result => execute(gen, result),
      err => gen.throw(err),
    );
  }
}

console.log("[INFO] Processed database seeders");


execute(seedDatabase(db)).then(
  () => console.log('[INFO] Done'),
  (err) => console.error(err.message),
);
