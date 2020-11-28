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
      CREATE TABLE tokens (
        token VARCHAR  PRIMARY KEY UNIQUE,
        userID VARCHAR  NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id)  ON DELETE CASCADE  ON UPDATE RESTRICT
      );
    `, () => resolve());
  });
};

exports.down = function(db) {
  return db.dropTable('tokens', true);
};

exports._meta = {
  "version": 1
};
