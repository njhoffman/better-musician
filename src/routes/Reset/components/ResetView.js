import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Paper } from 'material-ui';
import { Column } from 'react-foundation';

export const ResetView = (props) => (
  <Column centerOnSmall small={12} medium={10} large={8}>
    <Paper zDepth={5}>
      <p>This is the home screen</p>
      <Link to='/songs' activeClassName='route--active'>
        Songs
      </Link>
    </Paper>
  </Column>
);

// const mapActionCreators = ({});
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(ResetView);
