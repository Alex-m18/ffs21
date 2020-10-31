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
  return db.createTable('prices', {
    id: { type: 'int', primaryKey: true },
    standart: { type: 'int', notNull: true },
    vip: { type: 'int', notNull: true },
    movieID: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'price_movie_id_fk',
        table: 'movies',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    hallID: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'price_hall_id_fk',
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
  return db.dropTable('prices', true);
};

exports._meta = {
  "version": 1
};
