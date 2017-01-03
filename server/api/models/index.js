const exampleUsers = require('../exampleData/users');
const exampleSongs = require('../exampleData/songs');
const exampleArtists = require('../exampleData/artists');
const exampleGenres = require('../exampleData/genres');
const exampleInstruments = require('../exampleData/instruments');

const BaseModel = require('./_BaseModel');
const bcrypt = require("bcrypt");
const getDbModule = require("../db").getDbModule;

const debug = require("debug")("api:model");

class User extends BaseModel {
  static get tableName() { return "users"; }
  static get tableKeys() {
    return ["email", "uid", "id"];
  }
  static get exampleData() { return exampleUsers }
  constructor(user) {
    super();
    this.email = user.email;
    this.password = user.password;
  }
  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  static findByEmail(email) {
    return getDbModule()
      .db
      .table(this.tableName)
      .filter({ email: email })
      .coerceTo('array')
      .run(getDbModule().conn);
  }
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  save() {
    return getDbModule()
      .db
      .table(User.tableName)
      .insert({
        email: this.email,
        password: this.password
      })
      .run(getDbModule().conn)
      .then((res) => {
        if (res.inserted === 1) {
          this.id = res.generated_keys[0];
          return { email: this.email, id: this.id };
        } else {
          debug("ERROR %O", res);
        }
      });
  }
};
exports.User = User;

class Song extends BaseModel {
  static get tableName() { return "songs" }
  static get tableKeys() {
    return ["email", "uid", "id"];
  }
  static get exampleData() { return exampleSongs; }
  constructor(song) {
    super();
  }
  static findByUserId(uid) {
    return getDbModule()
      .db
      .table(this.tableName)
      .filter({ user: uid })
      .coerceTo('array')
      .run(getDbModule().conn);
  }
  save() {
    return getDbModule()
      .db
      .table(Song.tableName)
      .insert({
        email: this.email,
        password: this.password
      })
      .run(getDbModule().conn)
      .then((res) => {
        if (res.inserted === 1) {
          this.id = res.generated_keys[0];
          return { email: this.email, id: this.id };
        } else {
          debug("ERROR %O", res);
        }
      });
  }
};
exports.Song = Song;

class Artist extends BaseModel {
  static get tableName() { return "artists" }
  static get tableKeys() {
    return ["email", "uid", "id"];
  }
  static get exampleData() { return exampleArtists; }
  constructor(artist) {
    super();
  }
  save() {
    return getDbModule()
      .db
      .table(Artist.tableName)
      .insert({
        email: this.email,
        password: this.password
      })
      .run(getDbModule().conn)
      .then((res) => {
        if (res.inserted === 1) {
          this.id = res.generated_keys[0];
          return { email: this.email, id: this.id };
        } else {
          debug("ERROR %O", res);
        }
      });
  }
};
exports.Artist = Artist;

class Genre extends BaseModel {
  static get tableName() { return "genres" }
  static get tableKeys() {
    return ["email", "uid", "id"];
  }
  static get exampleData() { return exampleGenres; }
  constructor(genre) {
    super();
  }
  save() {
    return getDbModule()
      .db
      .table(Genre.tableName)
      .insert({
        email: this.email,
        password: this.password
      })
      .run(getDbModule().conn)
      .then((res) => {
        if (res.inserted === 1) {
          this.id = res.generated_keys[0];
          return { email: this.email, id: this.id };
        } else {
          debug("ERROR %O", res);
        }
      });
  }
};
exports.Genre = Genre;

class Instrument extends BaseModel {
  static get tableName() { return "instruments" }
  static get tableKeys() {
    return ["email", "uid", "id"];
  }
  static get exampleData() { return exampleInstruments; }
  constructor(instrument) {
    super();
  }
  save() {
    return getDbModule()
      .db
      .table(Instrument.tableName)
      .insert({
        email: this.email,
        password: this.password
      })
      .run(getDbModule().conn)
      .then((res) => {
        if (res.inserted === 1) {
          this.id = res.generated_keys[0];
          return { email: this.email, id: this.id };
        } else {
          debug("ERROR %O", res);
        }
      });
  }
};
exports.Instrument = Instrument;

exports.Models = {
  User,
  Song,
  Artist,
  Instrument,
  Genre
}
