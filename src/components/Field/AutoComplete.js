import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  TextField, Typography, MenuItem,
  withStyles, withTheme
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  }
});

const rsStyles = (theme) => ({
  menu: (base) => ({
    ...base,
    backgroundColor: theme.palette.background.paper,
    zIndex: 3
  })
});

const NoOptionsMessage = ({ selectProps, children, innerProps }) => (
  <Typography
    color='textSecondary'
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}>
    {children}
  </Typography>
);

NoOptionsMessage.propTypes = {
  selectProps:  PropTypes.object.isRequired,
  innerProps:   PropTypes.object,
  children:     PropTypes.string
};

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;
inputComponent.propTypes = { inputRef: PropTypes.func.isRequired };

const Control = ({ selectProps, innerRef, children, innerProps }) => (
  <TextField
    fullWidth
    InputProps={{
      inputComponent,
      inputProps: {
        className: selectProps.classes.input,
        ref: innerRef,
        children: children,
        ...innerProps,
      },
    }}
  />
);

Control.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps:  PropTypes.object.isRequired,
  children:    PropTypes.array.isRequired,
  innerRef:    PropTypes.func.isRequired
};


const CustomOption = ({ innerRef, isFocused, theme, innerProps, children }) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    style={{
      fontWeight: isFocused ? 500 : 400,
      color: theme.palette.text.primary,
      padding: '6px'
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);

CustomOption.propTypes = {
  theme:      PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  children:   PropTypes.string,
  innerRef:   PropTypes.func,
  isFocused:  PropTypes.bool.isRequired
};

const Option = withTheme()(CustomOption);

const Placeholder = ({ selectProps, innerProps, children }) => (
  <Typography
    color='textSecondary'
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    {children}
  </Typography>
);

Placeholder.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps:  PropTypes.object,
  children:    PropTypes.string
};

const SingleValue = ({ selectProps, innerProps, children }) => (
  <Typography
    className={selectProps.classes.singleValue}
    {...innerProps}>
    {children}
  </Typography>
);

SingleValue.propTypes = {
  selectProps: PropTypes.object.isRequired,
  innerProps:  PropTypes.object.isRequired,
  children:    PropTypes.array
};

const ValueContainer = ({ selectProps, children }) => (
  <div className={selectProps.classes.valueContainer}>
    {children}
  </div>
);

ValueContainer.propTypes = {
  selectProps: PropTypes.object.isRequired,
  children:    PropTypes.array
};

const Components = {
  Placeholder, Control, Option,
  NoOptionsMessage, SingleValue, ValueContainer
};

const AutoComplete = ({
  label,
  theme,
  ...props
}) => {
  return (
    <Select
      components={Components}
      placeholder={label}
      styles={rsStyles(theme)}
      {...props}
    />
  );
};

AutoComplete.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default withTheme()(withStyles(styles)(AutoComplete));
