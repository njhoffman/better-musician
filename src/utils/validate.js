import { get, each, some, keys, isFunction } from 'lodash';
import * as validators from 'validator';
import { init as initLog } from 'shared/logger';

const { debug, trace } = initLog('validator');

/**
 * @param {Object} fields - Form field names to validate
 * @param {string} fields[0] - Validators validation function name or 'required'
 * @param {string} fields[1] - Error label to display
 */
const noticesShown = [];
const validate = (fields, validateIfTouched = true) =>
  (formValues, { anyTouched, pristine, touchOnChange, form }) => {
    const errors = {};
    if (noticesShown.indexOf(form) === -1) {
      if (!validateIfTouched) {
        debug(`Ignoring field touch status for "${form}" form validation`);
      }
      if (touchOnChange) {
        debug(`Applying touch status to fields onChange event for "${form}" form validation`);
      }
      noticesShown.push(form);
    }
    const doValidation = (validateIfTouched && anyTouched) || !pristine;
    if (!doValidation) {
      return errors;
    }

    each(keys(fields), (fieldKey) => (
      some(fields[fieldKey], ([vCheck, vMessage]) => {
        if (vCheck === 'required' && !get(formValues, fieldKey)) {
          errors[fieldKey] = vMessage;
          return true;
        }
        if (isFunction(validators[vCheck])
          && get(formValues, fieldKey) !== undefined
          && !validators[vCheck](get(formValues, fieldKey).toString())
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
