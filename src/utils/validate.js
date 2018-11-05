import * as validators from 'validator';
import { get, each, some, keys, isFunction } from 'lodash';

const validate = (fields) => (values) => {
  const errors = {};
  const val = values.toString();
  each(keys(fields), (fieldKey) => some(fields[fieldKey],
    ([vCheck, vMessage]) => {
      if (vCheck === 'required' && !get(val, fieldKey)) {
        errors[fieldKey] = vMessage;
        return true;
      }
      if (isFunction(validators[vCheck])
        && get(val, fieldKey) !== undefined
        && !validators[vCheck](get(val, fieldKey))) {
        errors[fieldKey] = vMessage;
        return true;
      }
      return false;
    }));
  return errors;
};

export default validate;
