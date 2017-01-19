import {Model, ORM as Schema} from 'redux-orm';

export default class BaseModel extends Model {
  static loadData(data, Model) {
    data.forEach(d => {
      this.create(d);
    });
  }
}

