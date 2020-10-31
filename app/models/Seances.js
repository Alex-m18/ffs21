const Model = require('./Model');

class Seances extends Model {
  constructor(db) {
    super(db)
    this.table = 'seances';
  }
}

module.exports = Seances;
