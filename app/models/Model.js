class Model {
  constructor(db) {
    this.db = db;
    this.table = '';
  }

  async all(properties = [], property = null, operator = null, value = null, orderBy = null) {
    let valueStr = '';
    let whereStr = '';
    let orderByStr = '';
    if (property && operator && value) {
      valueStr = Array.isArray(value) ? `(${value.map((o) => `"${o}"`).join(', ')})` : `"${value}"`;
      whereStr = `WHERE ${property} ${operator} ${valueStr}`;
    }
    if (orderBy) orderByStr = `ORDER BY ${orderBy}`;

    let propStr = '*';
    if (properties.length) propStr = properties.join(', ');

    return await new Promise((resolve, reject) => {
      this.db.all(
        `SELECT ${propStr} FROM ${this.table} ${whereStr} ${orderByStr}`,
        [],
        function(err, rows) {
          if (err) reject(err);
          resolve(rows);
        }
      );
    }).catch((err) => null);
  }

  async find(properties = [], property = null, operator = null, value = null) {
    let valueStr = '';
    let whereStr = '';
    if (property && operator && value) {
      valueStr = `"${value}"`;
      whereStr = `WHERE ${property} ${operator} ${valueStr}`;
    }

    let propStr = '*';
    if (properties.length > 1) propStr = properties.join(', ');

    return await new Promise((resolve, reject) => {
      this.db.get(
        `SELECT ${propStr} FROM ${this.table} ${whereStr} LIMIT 1`,
        [],
        function(err, row) {
          if (err) reject(err);
          resolve(row);
        }
      );
    }).catch((err) => null);
  }


  async findByID(id) {
    return await new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.table} WHERE id="${id}"`,
        [],
        (err, row) => { if (err) reject(err); resolve(row); }
      );
    }).catch((err) => null);
  }

  async push(objects = []) {
    if (!objects || !objects.length) return null;
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const { columns, placeholders } = Model.prepareStringsFromObj(objects[0]);
        const stmt = this.db.prepare(`INSERT INTO ${this.table}(${columns}) VALUES (${placeholders})`);
        const ids = [];
        objects.forEach((o) => {
          const { values } = Model.prepareStringsFromObj(o);
          stmt.run(values, function(err) { ids.push(this.lastID); });
        });
        stmt.finalize(function(err) {
          if (err) reject(err);
          resolve(ids);
        });
      });
    });
  }

  async update(objects = [], key = 'id') {
    if (!objects || !objects.length) return 0;
    if (!objects.every((o) => o[key])) return 0;
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const keys = [...Object.keys(objects[0])].filter((k) => k !== key);
        const promises = [];
        
        objects.forEach((o) => {
          const sets = keys.map((key) => `'${key}' = '${o[key]}'`).join(', ');
          const promise = new Promise((resolve, reject) => {
            this.db.exec(
              `PRAGMA foreign_keys = ON;
              UPDATE '${this.table}' SET ${sets} WHERE ${key} = '${o[key]}'`,
              function(err) {
                if (err) reject(err);
                resolve(0);
              }
            );
          });
          promises.push(promise);
        });
        
        Promise.all(promises)
          .then(() => resolve(0))
          .catch((err) => reject(err));
      });
    });
  }

  async delete(objects = [], key = 'id') {
    if (!objects || !objects.length) return 0;
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const keys = [...Object.keys(objects[0])].filter((k) => k !== key);
        const promises = [];
        
        objects.forEach((o) => {
          const sets = keys.map((key) => `'${key}' = '${o[key]}'`).join(', ');
          const promise = new Promise((resolve, reject) => {
            this.db.exec(
              `PRAGMA foreign_keys = ON;
              DELETE FROM '${this.table}' WHERE ${key} = '${o[key]}';`,
              function(err) {
                if (err) reject(err);
                resolve(0);
              }
            );
          });
          promises.push(promise);
        });
        
        Promise.all(promises)
          .then(() => resolve(objects.map((o) => ({ ...o, success: true }))))
          .catch((err) => reject(err));
      });
    });
  }
}

Model.EQUAL = '=';
Model.BIGGER = '>';
Model.SMALLER = '<';
Model.BIGGER_EQUAL = '>=';
Model.SMALLER_EQUAL = '<=';

Model.prepareStringsFromObj = (obj) => {
  if (!obj) return;
  const keys = Array.from(Object.keys(obj));
  const values = Array.from(Object.values(obj));

  const placeholders = values.map((o) => '?').join(',');
  const columns = keys.join(',');

  return { columns, placeholders, values };
}

module.exports = Model;
