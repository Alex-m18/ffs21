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
  return db.createTable('seats', {
    id: { type: 'int', primaryKey: true },
    number: { type: 'int', notNull: true },
    row: { type: 'int', notNull: true },
    column: { type: 'int', notNull: true },
    type: { type: 'string', notNull: true },
    hallID: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'seat_hall_id_fk',
        table: 'halls',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
  });
};

exports.down = function(db) {
  return db.dropTable('seats', true);
};

exports._meta = {
  "version": 1
};
