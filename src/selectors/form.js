import { createSelector } from 'reselect';
import { cloneDeep } from 'lodash';
import { difference } from 'utils/app';

const initialValuesSelector = (form = {}) => cloneDeep(form.initial);
const currentValuesSelector = (form = {}) => cloneDeep(form.values);

const changedFieldsSelector = (initial, current) => (
  difference(current, initial)
  // return difference(cloneDeep(current), cloneDeep(initial))
);

export const changedFields = createSelector(
  initialValuesSelector,
  currentValuesSelector,
  changedFieldsSelector
);

export default changedFields;
