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
      CREATE TABLE "seances" (
        "id" VARCHAR  PRIMARY KEY,
        "date" datetime  NOT NULL,
        "state" VARCHAR  NOT NULL,
        "movieID" VARCHAR  NOT NULL,
        "hallID" VARCHAR  NOT NULL,
        FOREIGN KEY (movieID) REFERENCES movies(id)  ON DELETE CASCADE  ON UPDATE RESTRICT,
        FOREIGN KEY (hallID) REFERENCES halls(id)  ON DELETE CASCADE  ON UPDATE RESTRICT
      );
    `, () => resolve());
  });
};

exports.down = function(db) {
  return db.dropTable('seances', true);
};

exports._meta = {
  "version": 1,
};
