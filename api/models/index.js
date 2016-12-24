const bcrypt = require("bcrypt");
const db = require("../db").db;
const conn = require("../db").conn;


class User {
  static get tableName() { return "users" }
  constructor(user) {
    this.tableName = "users";
    this.email = user.email;
    this.password = user.password;
  }
  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  static findById(id) {
    return db.table(tableName()).get(id).coerceTo('array').run(conn);
  }
  static findByEmail(email) {
    return db.table(tableName()).filter({ email: email }).coerceTo('array').run(conn);
  }
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
};

exports.User = User
