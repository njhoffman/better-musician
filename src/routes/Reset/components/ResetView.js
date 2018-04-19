import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import { Column } from 'react-foundation';

export const ResetView = (props) => (
  <Column centerOnSmall small={12} medium={10} large={8}>
    <Paper zDepth={5}>
      <Link to='/songs'>
        Songs
      </Link>
    </Paper>
  </Column>
);

// const mapActionCreators = ({});
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(ResetView);
