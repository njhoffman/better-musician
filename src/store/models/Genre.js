import _ from 'lodash';
import BaseModel from './BaseModel';

class Genre extends BaseModel {
  static get path() {
    return `/images/genre`;
  }

  static get defaultImage() {
    return `_unknown.png`;
  }

  static get imageLabel() {
    return `Unknown Genre`;
  }

  static findByDisplayName(name) {
    return this.all().toModelArray().filter(genre => genre.displayName === name)[0];
  }

  static imagesByDisplayName(name) {
    const genre = Genre.findByDisplaylName(name);
    const images = genre && genre.images ? genre.images : [Genre.defaultImage];
    return images.map(img => `${Genre.path}/${img}`);
  }

  static reducer(action, Genre/* , session */) {
    const { type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        Genre.all().delete();
        break;
      case 'LOAD_GENRES':
        Genre.loadData(action.payload, this);
        break;
      default:
        break;
    }
  }

  get primaryImage() {
    return `${Genre.path}/${_.get(this, 'images[0].file') || Genre.defaultImage}`;
  }

  get imageLabel() {
    return this.name || Genre.imageLabel;
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

export default Genre;
