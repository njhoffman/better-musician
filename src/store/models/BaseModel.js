import { Model } from 'redux-orm';

export default class BaseModel extends Model {
  static loadData(data, Model) {
    data.forEach(d => {
      this.upsert(d);
    });
  }
}
