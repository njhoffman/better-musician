import { uniq } from 'lodash';
import { fk } from 'redux-orm';
import BaseModel from './BaseModel';

import {
  ADD_SONG,
  DELETE_SONG,
  UPDATE_SONG,
  SONGS_FETCH_START,
  LOAD_SONGS
} from 'constants/api';

class Song extends BaseModel {
  static getPointTotal() {
    const songs = this.all().toModelArray();
    return songs.reduce((a, b) => {
      return a + parseInt(b.progress * b.difficulty * 10);
    }, 0);
  }

  static getMaxDifficulty() {
    let max = 0;
    const songs = this.all().toModelArray();
    songs.forEach(song => {
      max = parseInt(song.difficulty) > max ? parseInt(song.difficulty) : max;
    });
    if (max === 0) {
      max = 20;
    }
    return max;
  }

  static getStats() {
    const songs = this.all().toModelArray();
    const artists = uniq(songs.map(song => {
      return song.artist.fullName;
    }));
    const genres = uniq(songs.map(song => {
      // TODO: investigate whhy navigating through time quickly this can throw bc song is undefined
      return song.genre.name;
    }));

    return {
      songCount: this.count(),
      artistCount: artists.length,
      genresCount: genres.length
    };
  }

  static reducer(action, Song/* , session */) {
    const { payload, type } = action;
    switch (type) {
      case ADD_SONG:
        Song.create(Object.assign({}, payload, { newSong: payload.song }));
        break;
      case SONGS_FETCH_START:
        // remove all songs when fetching
        if (Song.all().count() > 0) {
          Song.all().delete();
        }
        break;
      case LOAD_SONGS:
        Song.loadData(action.payload, Song);
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
  artist:       fk('Artist'),
  instrument:   fk('Instrument'),
  genre:        fk('Genre')
};

Song.shallowFields = {
  id:         'number',
  title:      'string',
  difficulty: 'number',
  progress:   'number'
};

export default Song;
