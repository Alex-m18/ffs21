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
  return db.createTable('seances', {
    id: { type: 'string', primaryKey: true },
    date: { type: 'datetime', notNull: true },
    state: { type: 'string', notNull: true },
    movieID: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'seance_movie_id_fk',
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
        name: 'seance_hall_id_fk',
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
  return db.dropTable('seances', true);
};

exports._meta = {
  "version": 1
};
