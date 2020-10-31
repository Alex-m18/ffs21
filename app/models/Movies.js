const Model = require('./Model');

class Movies extends Model {
  constructor(db) {
    super(db)
    this.table = 'movies';
  }
}

module.exports = Movies;
