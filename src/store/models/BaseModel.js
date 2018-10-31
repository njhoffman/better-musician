import { Model } from 'redux-orm';

export default class BaseModel extends Model {
  static loadData(data) {
    data.forEach(d => {
      this.upsert(d);
    });
  }
}
