import React from 'react';
import PropTypes from 'prop-types';
import {
  Select as MaterialSelect,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Typography,
  TextField,
  withStyles
} from '@material-ui/core';
import { FIELD_VIEW, FIELD_VIEW_ALT } from 'constants/ui';
import createComponent from './createFormField';
import mapError from './mapError';

const styles = (theme) => ({
  viewLabel: {
    textAlign: 'center'
  },
  viewValue: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    marginBottom: theme.spacing.unit
  }
});

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
  mode,
  input,
  initialValues,
  classes,
  ...props
}) => {
  if (mode === FIELD_VIEW_ALT) {
    return (
      <TextField
        variant='outlined'
        label={label}
        value={input.value}
        InputProps={{
          readOnly: true
        }}
        fullWidth
      />
    );
  } else if (mode === FIELD_VIEW) {
    return (
      <FormControl>
        <FormHelperText className={classes.viewLabel}>
          {label}
        </FormHelperText>
        <Typography className={classes.viewValue}>
          {input.value}
        </Typography>
      </FormControl>
    );
  }
  return (
    <FormControl style={{ minWidth: '120px' }}>
      <InputLabel shrink>
        {label}
      </InputLabel>
      <Component {...{ ...props, input, label }} displayEmpty>
        {options && generateMenu(options)}
      </Component>
    </FormControl>
  );
};

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
export default withStyles(styles)(SelectField);
