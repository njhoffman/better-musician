import { sortBy, sumBy } from 'lodash';
import BaseModel from './BaseModel';
import { many } from 'redux-orm';

class FieldTab extends BaseModel {
  static reducer(action, model /* , session */) {
    const { payload, type } = action;
    switch (type) {
      case 'LOAD_FIELD_TABS':
        this.loadData([].concat(payload), model);
        break;
      case 'ADD_FIELD_TAB':
        model.create(Object.assign({}, payload));
        break;
      case 'DELETE_FIELD_TAB':
        model.withId(payload).delete();
        break;
      default:
        break;
    }
  }

  get fieldProps() {
    const { id, label, type, options, defaultValue, name } = this;
    return {
      id,
      label,
      defaultValue,
      options,
      name,
      type: parseInt(type, 10)
    };
  }

  get sortedRows() {
    // TODO: come up with something cooler than this you poor tired bastard
    const sorted = [];
    const currRow = [];
    this.sortedFields.forEach(field => {
      const { fieldTypeProps: { rowDivisor } } = field;
      if (rowDivisor === 3) {
        sorted.push([...currRow], [field])
        currRow.splice(0);
      } else if (rowDivisor === 2) {
        if (currRow.length === 0){
          currRow.push(field);
        } else if (currRow.length === 1) {
          currRow.push(field);
          sorted.push([...currRow]);
          currRow.splice(0);
        } else {
          sorted.push([...currRow], [field])
          currRow.splice(0);
        }
      } else {
        currRow.push(field);
        if (sumBy(currRow, 'width') === 3) {
          sorted.push([...currRow]);
          currRow.splice(0);
        }
      }
    })
    return _.filter(sorted, (f) => f.length > 0)
  }

  get sortedFields() {
    return sortBy(this.fields.toModelArray(), [
      'fieldTypeProps.rowDivisor',
      'fieldTypeProps.heightScale',
      'id',
    ]);
  }

  toString() {
    return `FieldTab: ${this.type} ${this.label}`;
  }
}
FieldTab.modelName = 'FieldTab';

FieldTab.fields = {
  fields: many('Field')
};

FieldTab.shallowFields = {
  id:           'string',
  name:         'number',
  // updatedAt,
};

export default FieldTab;
