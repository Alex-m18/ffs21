'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return new Promise((resolve) => {
    db.runSql(`
      CREATE TABLE "seats_seances" (
        "id" VARCHAR  PRIMARY KEY,
        "state" VARCHAR  NOT NULL,
        "seatID" VARCHAR  NOT NULL,
        "seanceID" VARCHAR  NOT NULL,
        "ticketID" VARCHAR,
        FOREIGN KEY (seanceID) REFERENCES seances(id)  ON DELETE CASCADE  ON UPDATE RESTRICT,
        FOREIGN KEY (ticketID) REFERENCES tickets(id)  ON DELETE SET NULL  ON UPDATE RESTRICT
      );
    `, () => resolve());
  });
};

exports.down = function(db) {
  return db.dropTable('seats_seances', true);
};

exports._meta = {
  "version": 1,
};