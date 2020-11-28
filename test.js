const Database = require('better-sqlite3');
// const db = new Database('./database/db.sqlite', { verbose: console.log });

module.exports = async (db) => {
//  db.pragma('foreign_keys = ON');
//  db.prepare('DELETE FROM halls WHERE id = :id').run({ id: 'b6f18f02-d95e-4836-be02-e12b9998d9ca' });
  // db.close();

  del([{ id: 3 }], 'id', db, 'books');
};

async function del(objects = [], key = 'id', db, table) {
  if (!objects || !objects.length) return 0;
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const keys = [...Object.keys(objects[0])].filter((k) => k !== key);
      const promises = [];
      
      objects.forEach((o) => {
        const sets = keys.map((key) => `'${key}' = '${o[key]}'`).join(', ');
        const promise = new Promise((resolve, reject) => {
          db.exec(
            `PRAGMA foreign_keys = ON;
            DELETE FROM '${table}' WHERE ${key} = '${o[key]}';`,
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
