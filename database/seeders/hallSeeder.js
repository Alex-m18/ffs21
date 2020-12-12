const moment = require('moment');
const uuid = require('uuid').v4;
const Halls = require('../../app/models/Halls');

exports.name = 'hallsSeeder';

const randomNumber = (start, stop) => {
  return Math.floor(Math.random() * (stop - start + 1)) + start;
};

exports.run = async (db) => {
  const data = [];

  for (let i = 1; i <= 3; i += 1) {
    const rows = randomNumber(8, 15);
    const cols = randomNumber(Math.floor(rows * 2 / 3), Math.floor(rows / 2 * 3));
    const price = randomNumber(3, 10) * 50;
    const priceVip = price + randomNumber(1, 5) * 50;

    data.push({
      id: uuid(),
      title: `Зал ${i}`,
      rows,
      cols,
      price,
      priceVip,
      sale: true,
    });
  }

  const halls = new Halls(db);
  return await halls.push(data);
}
