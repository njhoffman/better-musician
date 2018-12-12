import { uniq } from 'lodash';
import { fk } from 'redux-orm';
import { SONGS_FETCH_START, SONGS_DELETE_COMPLETE } from 'constants/api';
import { LOAD_SONGS, ADD_SONG, UPDATE_SONG, } from 'constants/orm';
import BaseModel from './BaseModel';


class Song extends BaseModel {
  static getPointTotal() {
    const songs = this.all().toModelArray();
    return songs.reduce((a, b) => (
      a + parseInt((b.progress * b.difficulty * 10), 10)
    ), 0);
  }

  static getMaxDifficulty() {
    let max = 0;
    const songs = this.all().toModelArray();
    songs.forEach(song => {
      max = parseInt(song.difficulty, 10) > max
        ? parseInt(song.difficulty, 10) : max;
    });
    if (max === 0) {
      max = 20;
    }
    return max;
  }

  static getStats() {
    const songs = this.all().toModelArray();
    const artists = uniq(songs.map(song => song.artist.fullName));
    const genres = uniq(songs.map(song => (
      // TODO: investigate whhy navigating through time quickly this can throw bc song is undefined
      song.genre && song.genre.name
    )));

    return {
      songCount: this.count(),
      artistCount: artists.length,
      genresCount: genres.length
    };
  }

  static reducer(action, model/* , session */) {
    const { payload, type } = action;
    switch (type) {
      case ADD_SONG:
        model.create(Object.assign({}, payload));
        break;
      case SONGS_FETCH_START:
        // remove all songs when fetching
        if (model.all().count() > 0) {
          model.all().delete();
        }
        break;
      case LOAD_SONGS:
        model.loadData(payload, model);
        break;
      case SONGS_DELETE_COMPLETE:
        model.withId(payload).delete();
        break;
      case UPDATE_SONG:
        if (!payload.id) {
          /* eslint-disable no-console */
          console.error('Song update reducer needs the ID field');
          /* eslint-enable no-console */
        } else {
          model.withId(payload.id).update(payload);
        }
        break;
      default:
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
