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
          <Link to='/songs'>Songs</Link>
          <br />
          <Link to='/profile'>Profile</Link>
          <br />
          <Link to='/login'>Login</Link>
          <br />
          <Link to='/register'>Register</Link>
          <br />
          <Link to='/reset'>Reset</Link>
          <br />
          <Link to='/settings'> Settings</Link>
        </Column>
      </Row>
      <Divider className={classes.divider} />
      <Row>
        <Column>
          <Typography variant='h6'>
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
            onClick={() => showSnackbar(
              'This is a test warning message, it is supposed to be very long to simulate multiline text.',
              'warning'
            )}>
            Warning
          </Button>
          <Button
            color='secondary'
            onClick={() => showSnackbar('This is a test error message', 'error')}>
            Error
          </Button>
        </Column>
      </Row>
      <Divider className={classes.divider} />
      <Row>
        <Column style={{ height: '300px', overflowY: 'scroll' }}>
          <Typography variant='body2'>
            <span>body2:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='body1'>
            <span>body1:</span>
            <span> The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='subtitle2'>
            <span>subtitle2:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='subtitle1'>
            <span>subtitle1:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='overline'>
            <span>overline:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='button'>
            <span>button:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='caption'>
            <span>caption:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h6'>
            <span>h6:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h5'>
            <span>h5:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h4'>
            <span>h4:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h3'>
            <span>h3:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h2'>
            <span>h2:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
          <Typography variant='h1'>
            <span>h1:</span>
            <span>The quick brown fox jumped across...</span>
          </Typography>
          <br />
        </Column>
      </Row>
    </Paper>
  </Column>
);

HomeView.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  showSnackbar: PropTypes.func.isRequired
};

const mapActionCreators = ({
  showSnackbar: uiShowSnackbar
});

const mapStateToProps = (state) => ({
  songs: state.home && state.home.songs ? state.home.songs : []
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(HomeView));
