const Halls = require('../../app/models/Halls');
const Seats = require('../../app/models/Seats');

exports.name = 'seatSeeder';

exports.run = async (db) => {
  const halls = await (new Halls(db)).all();
  const data = [];

  for (let hall of halls) {
    const { id, rows, cols } = hall;
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
  }

  const seats = new Seats(db);
  return await seats.push(data);
};
