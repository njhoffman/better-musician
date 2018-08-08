import BaseModel from './BaseModel';

class Instrument extends BaseModel {
  static reducer(action, Instrument/* , session */) {
    const { type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        Instrument.all().delete();
        break;
      case 'LOAD_INSTRUMENTS':
        Instrument.loadData(action.payload, this);
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

export default Instrument;
