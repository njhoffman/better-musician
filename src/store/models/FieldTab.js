import { sortBy, sumBy, filter } from 'lodash';
import { many } from 'redux-orm';
import { LOAD_FIELD_TABS, ADD_FIELD_TAB, DELETE_FIELD_TAB } from 'constants/orm';
import BaseModel from './BaseModel';

class FieldTab extends BaseModel {
  static reducer(action, model /* , session */) {
    const { payload, type } = action;
    switch (type) {
      case LOAD_FIELD_TABS:
        this.loadData([].concat(payload), model);
        break;
      case ADD_FIELD_TAB:
        model.create(Object.assign({}, payload));
        break;
      case DELETE_FIELD_TAB:
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
    const sortedRows = [];
    const currRow = [];
    this.sortedFields.forEach(field => {
      const { fieldTypeProps: { rowDivisor } } = field;
      if (rowDivisor === 3) {
        sortedRows.push([...currRow], [field]);
        currRow.splice(0);
      } else if (rowDivisor === 2) {
        if (currRow.length === 0) {
          currRow.push(field);
        } else if (currRow.length === 1) {
          currRow.push(field);
          sortedRows.push([...currRow]);
          currRow.splice(0);
        } else {
          sortedRows.push([...currRow], [field]);
          currRow.splice(0);
        }
      } else {
        currRow.push(field);
        if (sumBy(currRow, 'width') === 3) {
          sortedRows.push([...currRow]);
          currRow.splice(0);
        }
      }
    });
    return filter(sortedRows, sortedRow => sortedRow.length > 0)
      .map((sortedRow, idx) => ({
        idx,
        fields: [...sortedRow],
      }));
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
