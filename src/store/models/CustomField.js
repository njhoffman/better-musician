import BaseModel from './BaseModel';

class CustomField extends BaseModel {
  static reducer(action, model /* , session */) {
    const { payload, type } = action;
    switch (type) {
      case 'FIELDS_UPDATE_COMPLETE':
      case 'LOAD_FIELDS':
        this.loadData([].concat(payload), model);
        break;
      case 'ADD_FIELD':
        model.create(Object.assign({}, payload));
        break;
      case 'FIELDS_DELETE_COMPLETE':
      case 'DELETE_FIELD':
        model.withId(payload).delete();
        break;
      default:
        break;
    }
  }

  static get typeOptions() {
    return {
      0: 'Text Box',
      1: 'AutoComplete Box',
      2: 'Select Menu',
      3: 'Multi-Select Menu',
      4: 'Check Box',
      5: 'Radio Buttons',
      6: 'Date',
      7: 'YouTube Link',
      8: 'PDF Link'
    };
  }

  get typeName() {
    return this.constructor.typeOptions[this.type];
  }

  get name() {
    // return isNaN(this.idx) ? this.id : 'customFields[' + this.idx + ']';
    return !(this.idx >= 0) ? `customFields[${this.id}]` : `customFields[${this.idx}]`;
  }

  get fieldProps() {
    const { id, idx, label, type, options, defaultValue, name } = this;
    return {
      id,
      idx,
      label,
      defaultValue,
      options,
      name,
      type: parseInt(type, 10)
    };
  }

  toString() {
    return `CustomField: ${this.type} ${this.label}`;
  }
}
CustomField.modelName = 'CustomField';

CustomField.fields = {};

CustomField.shallowFields = {
  id:           'number',
  idx:          'number',
  label:        'string',
  type:         'string',
  tabName:      'string',
  defaultValue: 'number',
  options:      'array'
};

export default CustomField;
