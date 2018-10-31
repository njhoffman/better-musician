import _ from 'lodash';
import BaseModel from './BaseModel';

class Instrument extends BaseModel {
  static get path() {
    return '/images/instrument';
  }

  static get defaultImage() {
    return '_unknown.png';
  }

  static get imageLabel() {
    return 'Unknown Instrument';
  }

  static findByDisplayName(name) {
    return this.all().toModelArray()
      .filter(instrument => instrument.displayName === name)[0];
  }

  static imagesByDisplayName(name) {
    const instrument = Instrument.findByDisplaylName(name);
    const images = instrument && instrument.images ? instrument.images : [Instrument.defaultImage];
    return images.map(img => `${Instrument.path}/${img}`);
  }

  static primaryImage() {
    return '/images/instrument/_unknown.png';
  }

  static reducer(action, model/* , session */) {
    const { type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        model.all().delete();
        break;
      case 'LOAD_INSTRUMENTS':
        model.loadData(action.payload, this);
        break;
      default:
        break;
    }
  }

  get primaryImage() {
    return `${Instrument.path}/${_.get(this, 'images[0].file') || Instrument.defaultImage}`;
  }

  get imageLabel() {
    return this.name || Instrument.imageLabel;
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

export default Instrument;
