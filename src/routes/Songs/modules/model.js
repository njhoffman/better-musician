import {fk, many, Model, ORM as Schema} from 'redux-orm';
import {
  ADD_SONG,
  SET_CURRENT_SONG,
	FETCH_SONGS,
  SHOW_SONGS,
  DELETE_SONG,
  UPDATE_SONG
} from './actionTypes';


// ------------------------------------
// Song
// ------------------------------------

class Song extends Model {
  constructor(song) {
    super(song);
  }
  static reducer(action, Song, session) {
    console.info("SONG REDUCER", action);
    const { payload, type } = action;
    switch (type) {
      case ADD_SONG:
        debugger;
        const newSong = action.payload.song;
        const props = Object.assign({}, payload, { newSong });
        Song.create(props);
        break;
      case 'SONGS_SUCCESS':
        debugger;
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
// Filter
// ------------------------------------


class Filter extends Model {
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

class Genre extends Model {
  static reducer(action, Genre, session) {
    const { payload, type } = action;
    switch (type) {
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

class Instrument extends Model {
  static reducer(action, Instrument, session) {
    const { payload, type } = action;
    switch (type) {
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

// ------------------------------------
// Artist
// ------------------------------------


class Artist extends Model {
  constructor(artist) {
    artist.fullName = artist.lastName + ', ' + artist.firstName;
    super(artist);
  }
  static reducer(action, Artist, session) {
    const { payload, type } = action;
    switch (type) {
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


export const models = [Song, Filter, Genre, Instrument, Artist];
