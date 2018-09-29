import BaseModel from './BaseModel';
import { SONGS_FETCH_START, LOAD_ARTISTS } from 'store/api';

class Artist extends BaseModel {

  static findByFullName(name) {
    return this.all().toModelArray().filter(artist => {
      return artist.fullName() === name;
    })[0];
  }

  static reducer(action, Artist/* , session */) {
    const { type } = action;
    switch (type) {
      case SONGS_FETCH_START:
        // remove all songs when fetching
        Artist.all().delete();
        break;
      case LOAD_ARTISTS:
        Artist.loadData(action.payload, Artist);
        break;
      default:
        break;
    }
  }

  constructor(artist) {
    super(artist);
  }

  fullName() {
    return this.lastName + ', ' + this.firstName;
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

export default Artist;
