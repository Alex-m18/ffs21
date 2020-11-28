const moment = require('moment');
const Users = require('../../app/models/Users');

exports.name = 'userSeeder';

const data = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
    password: 'admin',
  },
];

exports.run = async (db) => {
  const users = new Users(db);
  return await users.push(data);
}
