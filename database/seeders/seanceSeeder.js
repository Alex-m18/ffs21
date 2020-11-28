const moment = require('moment');
const uuid = require('uuid').v4;
const Movies = require('../../app/models/Movies');
const Halls = require('../../app/models/Halls');
const Seances = require('../../app/models/Seances');

exports.name = 'seanceSeeder';

const randomNumber = (start, stop) => {
  return Math.floor(Math.random() * (stop - start + 1)) + start;
};

exports.run = async (db) => {
  const moviesIDs = (await (new Movies(db)).all(['id'])).map((o) => o.id);
  const hallsIDs = (await (new Halls(db)).all(['id'])).map((o) => o.id);
  const data = [];

  moviesIDs.forEach((movieID) => {
    const count = randomNumber(2, 5);
    for (let i = 0; i < count; i += 1) {
      const date = moment()
        .add(1, 'hour')
        .startOf('hour')
        .add(randomNumber(1, 24) * 135, 'minute')
        .toISOString();
      data.push({
        id: uuid(),
        movieID,
        hallID: hallsIDs[randomNumber(0, hallsIDs.length - 1)],
        date,
        state: 'open',
      });
    }
  });

  const seances = new Seances(db);
  return await seances.push(data);
};
