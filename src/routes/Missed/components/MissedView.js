import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column, Row } from 'react-foundation';
import {
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit
  }
});

const MissedView = ({ classes }) => (
  <Column className={classes.root} small={12} medium={10} large={8}>
    <Paper elevation={5} className={classes.paper}>
      <Row>
        <Column>
          <Typography variant='h6'>
            That pagge does not exist!
          </Typography>
        </Column>
      </Row>
    </Paper>
  </Column>
);

MissedView.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

const mapActionCreators = ({ });
const mapStateToProps = (state) => ({ });
export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(MissedView));
