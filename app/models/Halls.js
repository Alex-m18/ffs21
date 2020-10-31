const Model = require('./Model');

class Halls extends Model {
  constructor(db) {
    super(db)
    this.table = 'halls';
  }
}

module.exports = Halls;
