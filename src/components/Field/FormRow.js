import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Row } from 'react-foundation';

const styles = (theme) => ({
  formRow: {
    // marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit,
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // alignItems: 'center',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  }
});

const FormRow = ({
  classes,
  className,
  children,
  ...props
}) => (
  <Row className={`${classes.formRow} ${className || ''}`}>
    {[].concat(children).map((child, i) =>
      React.isValidElement(child) ?
      React.cloneElement(child, { ...props, key: i }) : child
    )}
  </Row>
);
FormRow.propTypes = {
  classes:       PropTypes.object.isRequired,
  children:      PropTypes.any.isRequired
};

export default withStyles(styles)(FormRow);

