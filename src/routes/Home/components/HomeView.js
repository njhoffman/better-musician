import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Typography } from 'material-ui';
import withTheme from 'material-ui/styles/withTheme';
import { Column } from 'react-foundation';
import css from './HomeView.scss';

export const HomeView = (props) => (
  <Column centerOnSmall small={12} medium={10} large={8}>
    <Paper elevation={5}>
      <div className={css.homeContainer}>
        <Typography variant='display2'>
            This is the home screen
        </Typography>
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
      </div>
    </Paper>
  </Column>
);

// const mapActionCreators = ({});
const mapStateToProps = (state) => ({
  songs: state.home && state.home.songs ? state.home.songs : []
});

export default connect(mapStateToProps)(withTheme()(HomeView));
