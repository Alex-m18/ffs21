const Model = require('./Model');

class Seats extends Model {
  constructor(db) {
    super(db)
    this.table = 'seats';
  }
}

module.exports = Seats;
