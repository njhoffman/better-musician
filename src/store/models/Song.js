import { uniq } from 'lodash';
import { fk } from 'redux-orm';
import BaseModel from './BaseModel';

import {
  ADD_SONG,
  DELETE_SONG,
  UPDATE_SONG
} from './actionTypes';

import {
  FETCH_SONGS,
  LOAD_SONGS
} from 'store/api';

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
      max = song.difficulty > max ? song.difficulty : max;
    });
    if (max === 0) {
      max = 20;
    }
    return max;
  }

  static getStats() {
    const songs = this.all().toModelArray();
    const artists = uniq(songs.map(song => {
      if (!song.artist)
        debugger;
      return song.artist.fullName;
    }));
    const genres = uniq(songs.map(song => {
      return song.genre.name;
    }));

    return {
      songCount: this.count(),
      artistCount: artists.length,
      genresCount: genres.length
    };
  }

  static reducer(action, Song, session) {
    const { payload, type } = action;
    switch (type) {
      case ADD_SONG:
        const newSong = action.payload.song;
        const props = Object.assign({}, payload, { newSong });
        Song.create(props);
        break;
      case FETCH_SONGS:
        // remove all songs when fetching
        if (this.all().count() > 0) {
          this.all().delete();
        }
        break;
      case LOAD_SONGS:
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
