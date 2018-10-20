import * as validators from 'validator';
import { get, each, some, keys, isFunction } from 'lodash';

const validate = (fields) => (values) => {
  const errors = {};
  each(keys(fields), (field) => some(fields[field],
    ([vCheck, vMessage]) => {
      if (vCheck === 'required' && !get(values, field)) {
        errors[field] = vMessage;
        return true;
      }
      if (isFunction(validators[vCheck])
        && get(values, field) !== undefined
        && !validators[vCheck](get(values, field))) {
        errors[field] = vMessage;
        return true;
      }
      return false;
    }));
  return errors;
};

export default validate;
