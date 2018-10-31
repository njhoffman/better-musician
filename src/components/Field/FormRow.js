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
}) => {
  const nodes = [].concat(children).map((child, idx) => ({ ...child, idx }));
  return (
    <Row className={`${classes.formRow} ${className || ''}`}>
      {nodes.map((node, i) => (
        (React.isValidElement(node)
          ? React.cloneElement(node, { ...props, key: node.idx })
          : node
        )
      ))}
    </Row>
  );
};
FormRow.defaultProps = {
  className: ''
};

FormRow.propTypes = {
  className:   PropTypes.string,
  classes:     PropTypes.instanceOf(Object).isRequired,
  children:    PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default withStyles(styles)(FormRow);
