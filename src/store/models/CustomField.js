import BaseModel from './BaseModel';
import { fk, many } from 'redux-orm';

class CustomField extends BaseModel {

  static reducer(action, Field, session) {
    const { payload, type } = action;
    switch (type) {
      case 'LOAD_FIELDS':
        this.loadData(action.payload, Field);
        break;
      case 'ADD_FIELD':
        if (action.payload) {
          this.create(action.payload);
        }
        break;
      case 'DELETE_FIELD':
        if (action.payload) {
          const field = Field.withId(action.payload);
          field.delete();
        }
        break;
      default:
        break;
    }
  }
  constructor(field) {
    super(field);
  }
  get typeOptions() {
    return {
        0: "Text Box",
        1: "AutoComplete Box",
        2: "Select Menu",
        3: "Multi-Select Menu",
        4: "Check Box",
        5: "Radio Buttons",
        6: "Date",
        7: "YouTube Link",
        8: "PDF Link"
      }
  }
  get typeName() {
    return this.typeOptions[this.type];
  }
  toString() {
    return `CustomField: ${this.type} ${this.label}`;
  }
}
CustomField.modelName = 'CustomField';

CustomField.fields = { };

CustomField.shallowFields = {
  id: 'number',
  name: 'string',
  label: 'string',
  type: 'string',
  tabName: 'string',
  defaultValue: 'number',
  optionValues: 'array',
};


export default CustomField;
