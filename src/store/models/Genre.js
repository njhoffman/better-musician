import _ from 'lodash';
import BaseModel from './BaseModel';

class Genre extends BaseModel {
  static get path() {
    return '/images/genre';
  }

  static get defaultImage() {
    return '_unknown.png';
  }

  static get imageLabel() {
    return 'Unknown Genre';
  }

  static findByName(name) {
    return this.all()
      .toModelArray()
      .filter(genre => genre.name === name)[0];
  }

  static imagesByName(name) {
    const genre = Genre.findByName(name);
    const images = genre && genre.images ? genre.images : [Genre.defaultImage];
    return images.map(img => `${Genre.path}/${img}`);
  }

  static reducer(action, model/* , session */) {
    const { type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        model.all().delete();
        break;
      case 'LOAD_GENRES':
        model.loadData(action.payload, this);
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
