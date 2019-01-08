// import PropTypes from 'prop-types'
// import propTypesMixin from 'redux-orm-proptypes';
import { fk } from 'redux-orm';
import { getFieldByType, getDefaultValues } from 'components/Field/FieldTypes';
import { LOAD_FIELDS, ADD_FIELD, DELETE_FIELD } from 'constants/orm';
import { FIELDS_DELETE_COMPLETE, FIELDS_UPDATE_COMPLETE } from 'constants/api';
import BaseModel from './BaseModel';

class Field extends BaseModel {
  static reducer(action, model /* , session */) {
    const { payload, type } = action;
    switch (type) {
      case FIELDS_UPDATE_COMPLETE:
      case LOAD_FIELDS:
        this.loadData([].concat(payload), model);
        break;
      case ADD_FIELD:
        model.create(Object.assign({}, payload));
        break;
      case FIELDS_DELETE_COMPLETE:
      case DELETE_FIELD:
        model.withId(payload).delete();
        break;
      default:
        break;
    }
  }
  // TODO: create validate function to ensure applicable field types have options

  static findById(id) {
    return this.all()
      .toModelArray()
      .filter(field => field.id === id)[0];
  }

  get defaultValue() {
    return getDefaultValues(this.typeId, this.options);
  }

  get typeLabel() {
    const { label } = getFieldByType({ typeId: this.typeId });
    return label;
  }

  get width() {
    const { rowDivisor } = getFieldByType({ typeId: this.typeId });
    return rowDivisor;
  }

  get multiple() {
    const { multi } = getFieldByType({ typeId: this.typeId });
    return multi;
  }

  get name() {
    return `userFields[${this.id}]`;
  }

  get fieldTypeProps() {
    const { type, typeId } = this;
    return getFieldByType({ type, typeId });
  }

  get fieldProps() {
    // const { name: tabName } = this.fieldtabSet.toModelArray()[0];
    const { id, label, name, typeId, options, multiple } = this;

    return {
      id,
      label,
      options,
      name,
      typeId,
      multiple
    };
  }

  toString() {
    return `Field: ${this.type} ${this.label}`;
  }
}
Field.modelName = 'Field';

Field.fields = {
  tab: fk('FieldTab')
};

Field.shallowFields = {
  id:           'string',
  label:        'string',
  typeId:       'number',
  defaultValue: 'number',
  options:      'array'
};

export default Field;
