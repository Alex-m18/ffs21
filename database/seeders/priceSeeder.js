const Movies = require('../../app/models/Movies');
const Halls = require('../../app/models/Halls');
const Prices = require('../../app/models/Prices');

exports.name = 'PriceSeeder';

const randomNumber = (start, stop) => {
  return Math.floor(Math.random() * (stop - start + 1)) + start;
};

exports.run = async (db) => {
  const moviesIDs = (await (new Movies(db)).all(['id'])).map((o) => o.id);
  const hallsIDs = (await (new Halls(db)).all(['id'])).map((o) => o.id);
  const data = [];

  moviesIDs.forEach((movieID) => {
    hallsIDs.forEach((hallID) => {
      const standart = randomNumber(3, 10) * 50;
      const vip = standart + randomNumber(1, 5) * 50;

      data.push({
        standart,
        vip,
        movieID,
        hallID,
      });
    })
  })

  const prices = new Prices(db);
  return await prices.push(data);
};
