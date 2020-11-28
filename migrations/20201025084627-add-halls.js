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
  return db.createTable('halls', {
    id: { type: 'string', primaryKey: true },
    title: { type: 'string', notNull: true },
    rows: { type: 'int', notNull: true, defaultValue: 10 },
    cols: { type: 'int', notNull: true, defaultValue: 8 },
    price: { type: 'int', notNull: true, defaultValue: 250 },
    priceVip: { type: 'int', notNull: true, defaultValue: 300 },
  });
};

exports.down = function(db) {
  return db.dropTable('halls', true);
};

exports._meta = {
  "version": 1
};
