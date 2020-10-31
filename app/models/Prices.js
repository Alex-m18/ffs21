const Model = require('./Model');

class Prices extends Model {
  constructor(db) {
    super(db)
    this.table = 'prices';
  }

  findByMovieHall(movieID, hallID) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.table} WHERE movieID = '${movieID}' AND hallID = '${hallID}' LIMIT 1`,
        [],
        function(err, row) {
          if (err) reject(err);
          resolve(row);
        }
      );
    });
  }
}

module.exports = Prices;
