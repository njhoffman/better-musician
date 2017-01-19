import BaseModel from './BaseModel';

class Artist extends BaseModel {
  constructor(artist) {
    artist.fullName = artist.lastName + ', ' + artist.firstName;
    super(artist);
  }
  static findByFullName(name) {
    return this.all().toModelArray().filter(artist => {
      return artist.fullName === name;
    })[0];
  }
  static reducer(action, Artist, session) {
    const { payload, type } = action;
    switch (type) {
      case 'SONGS_REQUEST':
        // remove all songs when fetching
        this.all().delete();
        break;
      case 'LOAD_ARTISTS':
        this.loadData(action.payload, Artist);
        break;
      default:
        break;
    }
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
