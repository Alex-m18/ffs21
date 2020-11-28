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
  return db.createTable('users', {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
    },
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      notNull: true,
      unique: true,
    },
    role: {
      type: 'string',
      notNull: true,
    },
    hash: {
      type: 'string',
      notNull: true,
      unique: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('users', true);
};

exports._meta = {
  "version": 1
};
