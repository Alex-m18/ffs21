const Model = require('../../app/models/Model');
const Seances = require('../../app/models/Seances');
const Seats = require('../../app/models/Seats');
const SeatStates = require('../../app/models/SeatStates');

const uuid = require('uuid').v4;

exports.name = 'seatSeanceSeeder';

exports.run = async (db) => {
  const seances = await (new Seances(db)).all();
  const seats = new Seats(db);
  const data = [];

  for (let seance of seances) {
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
  };

  const seatStates = new SeatStates(db);
  return await seatStates.push(data);
};
