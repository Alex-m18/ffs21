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
  return db.createTable('movies', {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
    },
    title: 'string',
    description: 'string',
    duration: 'int',
    origin: 'string',
    posterTitle: 'string',
    posterLink: 'string',
  });
};

exports.down = function(db) {
  return db.dropTable('movies', true);
};

exports._meta = {
  "version": 1
};
