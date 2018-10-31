import _ from 'lodash';
import { SONGS_FETCH_START, LOAD_ARTISTS, ARTISTS_FETCH_START } from 'constants/api';
import BaseModel from './BaseModel';

class Artist extends BaseModel {
  static get path() {
    return '/images/artist';
  }

  static get defaultImage() {
    return '_unknown.png';
  }

  static get imageLabel() {
    return 'Unknown Artist';
  }

  static findByFullName(name) {
    return this.all().toModelArray()
      .filter(artist => (
        artist.fullName === name
      ))[0];
  }


  static imagesByFullName(name) {
    const artist = Artist.findByFullName(name);
    const images = artist && artist.images ? artist.images : [Artist.defaultImage];
    return images.map(img => `${Artist.path}/${img}`);
  }

  static reducer(action, ArtistModel/* , session */) {
    const { type } = action;
    switch (type) {
      case SONGS_FETCH_START:
        // remove all songs when fetching
        ArtistModel.all().delete();
        break;
      case ARTISTS_FETCH_START:
        // remove all songs when fetching
        break;
      case LOAD_ARTISTS:
        ArtistModel.loadData(action.payload, ArtistModel);
        break;
      default:
        break;
    }
  }

  get fullName() {
    return `${this.lastName}, ${this.firstName}`;
  }

  get imageLabel() {
    return this.lastName ? `${this.lastName}, ${this.firstName}` : Artist.imageLabel;
  }

  get primaryImage() {
    return `${Artist.path}/${_.get(this, 'images[0].file') || Artist.defaultImage}`;
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
