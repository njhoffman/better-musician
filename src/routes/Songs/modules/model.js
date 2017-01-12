import {fk, many, Model, ORM as Schema} from 'redux-orm';
import {
  ADD_SONG,
  SET_CURRENT_SONG,
	FETCH_SONGS,
  SHOW_SONGS,
  DELETE_SONG,
  UPDATE_SONG
} from './actionTypes';


class BaseModel extends Model {
  static loadData(data, Model) {
    data.forEach(d => {
      this.create(d);
    });
  }
}

// ------------------------------------
// Song
// ------------------------------------

class Song extends BaseModel {
  static getPointTotal() {
    const songs = this.all().toModelArray();
    return songs.reduce( (a,b) => {
      return a + parseInt(b.progress * b.difficulty * 10)
    }, 0);
  }
  static reducer(action, Song, session) {
    const { payload, type } = action;
    switch (type) {
      case ADD_SONG:
        const newSong = action.payload.song;
        const props = Object.assign({}, payload, { newSong });
        Song.create(props);
        break;
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        if (this.all().count() > 0) {
          this.all().delete();
        }
        break;
      case 'LOAD_SONGS':
        this.loadData(action.payload, Song);
        break;
      case DELETE_SONG:
        Song.withId(payload).delete();
        break;
      case UPDATE_SONG:
        break;
    }
  }
  toString() {
    return `Song: ${this.title}`;
  }
}

Song.modelName = 'Song';

Song.fields = {
  artist:     fk("Artist"),
  instrument: fk("Instrument"),
  genres:     many("Genre")
};

Song.shallowFields = {
  id:         'number',
  title:      'string',
  difficulty: 'number',
  progress:   'number'
};

// ------------------------------------
// Artist
// ------------------------------------


class Artist extends BaseModel {
  constructor(artist) {
    artist.fullName = artist.lastName + ', ' + artist.firstName;
    super(artist);
  }
  static reducer(action, Artist, session) {
    const { payload, type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        this.all().delete();
        break;
      case 'LOAD_ARTISTS':
        this.loadData(action.payload, Artist);
        break;
      default:
        break;
    }
  }
  toString() {
    return `Artist: ${this.lastName}`;
  }
}

Artist.modelName = 'Artist';

Artist.fields = {};

Artist.shallowFields = {
  id: 'number',
  name: 'string',
  icon: 'string'
};


// ------------------------------------
// Filter
// ------------------------------------


class Filter extends BaseModel {
  static reducer(action, Filter, session) {
    const { payload, type } = action;
    switch (type) {
      default:
        break;
    }
  }
  toString() {
    return `Filter: ${this.name}`;
  }
}

Filter.modelName = 'Filter';

Filter.fields = { };

Filter.shallowFields = {
  id: 'number',
  name: 'string'
};

// ------------------------------------
// Genre
// ------------------------------------

class Genre extends BaseModel {
  static reducer(action, Genre, session) {
    const { payload, type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        this.all().delete();
        break;
      case 'LOAD_GENRES':
        this.loadData(action.payload, this);
        break;
      default:
        break;
    }
  }
  toString() {
    return `Genre: ${this.name}`;
  }
}

Genre.modelName = 'Genre';

Genre.fields = { };

Genre.shallowFields = {
  id: 'number',
  name: 'string',
  icon: 'string'
};

// ------------------------------------
// Instruments
// ------------------------------------

class Instrument extends BaseModel {
  static reducer(action, Instrument, session) {
    const { payload, type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        this.all().delete();
        break;
      case 'LOAD_INSTRUMENTS':
        this.loadData(action.payload, this);
        break;
      default:
        break;
    }
  }
  toString() {
    return `Instrument: ${this.name}`;
  }
}

Instrument.modelName = 'Instrument';

Instrument.fields = {};

Instrument.shallowFields = {
  id: 'number',
  name: 'string',
  icon: 'string'
};


exports.Song = Song;
exports.Artist = Artist;
exports.Instrument = Instrument;
exports.Genre = Genre;
exports.Filter = Filter;
export default [Song, Filter, Genre, Instrument, Artist];
