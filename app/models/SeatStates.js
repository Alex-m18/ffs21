const Model = require('./Model');

class SeatStates extends Model {
  constructor(db) {
    super(db)
    this.table = 'seats_seances';
  }
}

module.exports = SeatStates;
