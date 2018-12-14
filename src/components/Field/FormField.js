import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field, FieldArray } from 'redux-form';
import { Column } from 'react-foundation';
import { withStyles } from '@material-ui/core';

import { withFieldTypes } from './FieldTypes';
import FormRow from './FormRow';
import Stars from './Stars';
import Difficulty from './Difficulty';
import Chip from './Chip';

const styles = (theme) => ({
  column: {
    [theme.breakpoints.down('sm')]: {
      margin: '0px'
    },
    flex: '1 1 auto',
    width: '100%',
    maxWidth: '100%',
    margin: '4px 0px'
  }
});

const FormField = ({
  small, medium, large, centerOnSmall,
  variant, classes, className, Component,
  fieldType: { multi },
  ...props
}) => (
  <Column
    className={`${className} ${classes.column}`}
    {...{ small, medium, large, centerOnSmall }}>
    {!multi && (
      <Field component={Component} {...props} />
    )}
    {multi && (
      <FieldArray component={Component} {...props} />
    )}
  </Column>
);

FormField.defaultProps = {
  centerOnSmall : false,
  preview       : false,
  style         : {},
  large         : 8,
  medium        : 10,
  small         : 12
};

FormField.propTypes = {
  centerOnSmall : PropTypes.bool,
  preview       : PropTypes.bool,
  style         : PropTypes.instanceOf(Object),
  small         : PropTypes.number,
  medium        : PropTypes.number,
  large         : PropTypes.number
};

export { FormRow, Stars, Difficulty, Chip };
export default compose(
  withStyles(styles),
  withFieldTypes
)(FormField);
