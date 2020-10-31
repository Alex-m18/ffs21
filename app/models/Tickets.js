const Model = require('./Model');

class Tickets extends Model {
  constructor(db) {
    super(db)
    this.table = 'tickets';
  }
}

module.exports = Tickets;
