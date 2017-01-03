const exampleSongs = require('./exampleData/songs');
const exampleArtists = require('./exampleData/artists');
const exampleGenres = require('./exampleData/genres');
const exampleInstruments = require('./exampleData/instruments');

const tables = {
  "users" : {
    modelName: "User",
    fields: {
      email: 'string',
      password: 'string'
    }
  },
  "songs" : {
    modelName: "Song",
    exampleData: exampleSongs,
    fields: {
      title:      'string',
      difficulty: 'number',
      progress:   'number',
      artist:     'fk:Artist',
      instrument: 'fk:Instrument',
      genres:     'many:Genre'
    }
  },
  "artists" : {
    modelName: "Song",
    exampleData: exampleSongs,
    fields: {}
  },
  "instruments" : {
    modelName: "Instrument",
    exampleData: exampleInstruments,
    fields: {}
  },
  "genres" : {
    modelName: "Genre",
    exampleData: exampleGenres,
    fields: {}
  },
  "levels" : {
    modelName: "Level",
    fields: {}
  }
};

const getShallowFields = () => {};
const getRelationFields = () => {};

exports.tables = tables;
