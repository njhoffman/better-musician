import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Tabs, Tab, AppBar, Typography } from '@material-ui/core';
import { Column } from 'react-foundation';
import { withRouter } from 'react-router';
import css from './StatsView.scss';

export const StatsView = ({ history }) => (
  <Column centerOnSmall small={12} medium={10} large={8}>
    <Paper elevation={5}>
      <div className={css.statsContainer}>
        <AppBar position='static'>
          <Tabs
            centered
            fullWidth
            onChange={(e, value) => history.push(value)}
            value='stats'>
            <Tab
              data-route='/profile'
              value='profile'
              label='Profile'
            />
            <Tab
              value='stats'
              data-route='/stats'
              label='Stats'
            />
            <Tab
              data-route='/settings'
              value='settings'
              label='Settings'
            />
            <Tab
              data-route='/fields'
              value='fields'
              label='Fields'
            />
          </Tabs>
        </AppBar>
        <form className={css.statsForm}>
          <Typography>These Are Your Stats</Typography>
        </form>
      </div>
    </Paper>
  </Column>
);

StatsView.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired
};

const mapActionCreators = {};
const mapStateToProps = (state) => ({
  api: state.api
});

export default withRouter(connect(mapStateToProps, mapActionCreators)(StatsView));
