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
  return db.createTable('seats_seances', {
    id: { type: 'string', primaryKey: true },
    state: { type: 'string', notNull: true },
    seatID: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'seats_seances_seat_id_fk',
        table: 'seats',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    seanceID: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'seats_seances_seance_id_fk',
        table: 'seances',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    ticketID: {
      type: 'string',
      foreignKey: {
        name: 'seats_seances_ticket_id_fk',
        table: 'tickets',
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
  return db.dropTable('seats_seances', true);
};

exports._meta = {
  "version": 1
};
