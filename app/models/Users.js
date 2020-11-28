const Model = require('./Model');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const paseto = require('paseto');
const { createPrivateKey } = require('crypto');
const fs = require('fs');

const pasetoKey = process.env.PASETO_KEY;

class Users extends Model {
  constructor(db) {
    super(db)
    this.table = 'users';
  }

  async push(objects = []) {
    const handledObjects = [];
    for (let obj of objects) {
      const salt = await bcrypt.genSalt();
      handledObjects.push({
        id: obj.id ? obj.id : uuid(),
        username: obj.username,
        email: obj.email,
        role: obj.role ? obj.role : 'user',
        hash: obj.password ? bcrypt.hashSync(obj.password, salt) : undefined,
      });
    }
    return super.push(handledObjects);
  }

  async verifyPassword({ id, email, password, hash }) {
    if (!password) return;
    if (!(id || email)) return;
    if (!hash) {
      if (email) {
        hash = (await this.find([], 'email', Model.EQUAL, email)).hash;
      } else {
        hash = (await this.findByID(id)).hash;
      }
    }
    return bcrypt.compare(password, hash);
  }

  async getToken({ id, username = null, email = null }) {
    if (!id) return;
    let user = { id, username, email };
    if (!(id, username, email)) user = await this.findByID(id);
    if (!user) return;
    const pk = createPrivateKey(Buffer.from(pasetoKey));
    const signed = await paseto.V2.sign({
        id: user.id,
        username: user.username,
        email: user.email,
      }, pk, { expiresIn: '24 hours' });
    return signed;
  }

  async verifyToken(id, token) {
    if (!id) return;
    const user = await this.findByID(id);
    if (!user) return;

    const pk = createPrivateKey(Buffer.from(pasetoKey));
    return paseto.V2.verify(token, pk);
  }

}

module.exports = Users;
