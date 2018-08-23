import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column, Row } from 'react-foundation';
import {
  Paper,
  Typography,
  Divider,
  Button,
  withStyles
} from '@material-ui/core';

import { uiShowSnackbar } from 'actions/ui';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit
  },
  divider: {
    margin: theme.spacing.unit
  }
});

export const HomeView = ({ classes, showSnackbar }) => (
  <Column className={classes.root} small={12} medium={10} large={8}>
    <Paper elevation={5} className={classes.paper}>
      <Row>
        <Column>
          <Typography variant='title'>
              This is the home screen
          </Typography>
          <Link to='/songs'>Songs</Link><br />
          <Link to='/profile'>Profile</Link><br />
          <Link to='/login'>Login</Link><br />
          <Link to='/register'>Register</Link><br />
          <Link to='/reset'>Reset</Link><br />
          <Link to='/settings'> Settings</Link>
        </Column>
      </Row>
      <Divider className={classes.divider} />
      <Row>
        <Column>
          <Typography variant='title'>
            Snackbars
          </Typography>
          <Button
            color='secondary'
            onClick={() => showSnackbar('This is a test success message', 'success')}>
            Success
          </Button>
          <Button
            color='secondary'
            onClick={() => showSnackbar('This is a test information message', 'info')}>
            Info
          </Button>
          <Button
            color='secondary'
            onClick={() => showSnackbar('This is a test warning message', 'warning')}>
            Warning
          </Button>
          <Button
            color='secondary'
            onClick={() => showSnackbar('This is a test error message', 'error')}>
            Error
          </Button>
        </Column>
      </Row>
    </Paper>
  </Column>
);

HomeView.propTypes = {
  classes: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired
};

const mapActionCreators = ({
  showSnackbar: uiShowSnackbar
});

const mapStateToProps = (state) => ({
  songs: state.home && state.home.songs ? state.home.songs : []
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(HomeView));
