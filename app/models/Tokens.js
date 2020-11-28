const Model = require('./Model');

class Tokens extends Model {
  constructor(db) {
    super(db)
    this.table = 'tokens';
  }
}

module.exports = Tokens;
