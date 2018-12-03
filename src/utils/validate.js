import { get, each, some, keys, isFunction } from 'lodash';
import * as validators from 'validator';
import { init as initLog } from 'shared/logger';

const { debug } = initLog('validator');

/**
 * @param {Object} fields - Form field names to validate
 * @param {string} fields[0] - Validators validation function name or 'required'
 * @param {string} fields[1] - Error label to display
 */
const validate = (fields) => (values, { anyTouched }) => {
  const errors = {};
  const val = values;

  if (!anyTouched) {
    return errors;
  }
  each(keys(fields), (fieldKey) => (

    some(fields[fieldKey], ([vCheck, vMessage]) => {
      if (vCheck === 'required' && !get(val, fieldKey)) {
        errors[fieldKey] = vMessage;
        return true;
      }
      if (isFunction(validators[vCheck])
        && get(val, fieldKey) !== undefined
        && !validators[vCheck](get(val, fieldKey).toString())
      ) {
        errors[fieldKey] = vMessage;
        return true;
      }
      return false;
    })
  ));

  keys(errors).forEach(key => (
    debug(`Validation error: ${key} (${errors[key]})`)
  ));
  return errors;
};

export default validate;
