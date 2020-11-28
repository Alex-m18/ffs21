const moment = require('moment');
const uuid = require('uuid').v4;
const Tickets = require('../../app/models/Tickets');
const Seances = require('../../app/models/Seances');
const SeatStates = require('../../app/models/SeatStates');
const Model = require('../../app/models/Model');

const randomNumber = (start, stop) => {
  return Math.floor(Math.random() * (stop - start + 1)) + start;
};

exports.name = 'ticketSeeder';

exports.run = async (db) => {
  const seances = await (new Seances(db)).all();
  const seatStates = new SeatStates(db);
  const tickets = new Tickets(db);

  const data = [];
  for (let i = 0; i < seances.length * 5; i += 1) {
    data.push({
      id: uuid(),
      date: moment().toISOString(),
      price: randomNumber(2, 20) * 50,
    });
  };

  const ids = await tickets.push(data);
  
  const updates = [];

  for (let ticket of data) {
    const index = randomNumber(0, seances.length - 1);
    const seats = await seatStates.all([], 'seanceID', Model.EQUAL, seances[index].id);
    for (let i = 0; i < randomNumber(2, 10); i += 1) {
      const seat = seats[randomNumber(0, seats.length - 1)];
      if (seat.state === 'taken') {
        i -= 1;
        continue;
      }
      updates.push({
        id: seat.id,
        ticketID: ticket.id,
        state: 'taken',
      });
      seat.state = 'taken';
    }
  }

  const count = seatStates.update(updates)
    .then(() => ids.length);

  return await count;
};
