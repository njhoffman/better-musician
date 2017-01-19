import BaseModel from './BaseModel';

class Instrument extends BaseModel {
  static reducer(action, Instrument, session) {
    const { payload, type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        this.all().delete();
        break;
      case 'LOAD_INSTRUMENTS':
        this.loadData(action.payload, this);
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
