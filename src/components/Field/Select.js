import React from 'react';
import PropTypes from 'prop-types';
import {
  Select as MaterialSelect,
  InputLabel,
  FormControl,
  MenuItem
} from '@material-ui/core';
import createComponent from './createFormField';
import mapError from './mapError';

const generateMenu = (dataSource) => {
  const items = [
    <MenuItem key={-1} value='' disabled>Select...</MenuItem>
  ];
  const isArray = Array.isArray(dataSource);
  // assign value to key if dataSource is an object, otherwise assign scalar value
  Object.keys(dataSource).forEach(key => {
    items.push(
      <MenuItem
        value={isArray ? dataSource[key] : key}
        key={isArray ? dataSource[key] : key}>
        {dataSource[key]}
      </MenuItem>
    );
  });
  return items;
};

const SelectForm = createComponent(MaterialSelect, ({
  input: { onChange, value, onBlur, ...inputProps },
  onChange: onChangeFromField,
  defaultValue,
  ...props
}) => ({
  ...mapError({ ...props, hasHelperText: false }),
  ...inputProps,
  value,
  onChange: event => {
    onChange(event.target.value);
    if (onChangeFromField) {
      onChangeFromField(event.target.value);
    }
  },
  onBlur: () => onBlur(value)
}));

const createSelect = (Component) => ({
  label,
  options,
  variant,
  initialValues,
  ...props
}) => (
  <FormControl style={{ minWidth: '120px' }}>
    <InputLabel shrink>
      {label}
    </InputLabel>
    <Component {...props} displayEmpty>
      {options && generateMenu(options)}
    </Component>
  </FormControl>
);

const defaultProps = {
  label: ''
};

const propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired, // can be object or array
  label: PropTypes.string
};


const SelectField = createSelect(SelectForm);
SelectField.defaultProps = defaultProps;
SelectField.propTypes = propTypes;

const Select = createSelect(MaterialSelect);
Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export { Select };
export default SelectField;
