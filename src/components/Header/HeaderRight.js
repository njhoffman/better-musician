import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAccountCircle as AvatarIcon } from 'react-icons/md';
import { withStyles, Avatar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import Button from 'components/Button';
import {
  userDisplay as userDisplaySelector,
  userPoints as userPointsSelector
} from 'selectors/users';

const styles = {
  flex: {
    flex: 1,
    textAlign: 'right'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileDisplay: {
    width: 'calc(100% - 55px)',
    textDecoration: 'none'
  },
  profilePoints: {
    fontSize: '1.3em',
    lineHeight: '1.3em',
    textDecoration: 'none'
  },
  profileName: {
    fontSize: '0.8em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '0.8em',
  },
  profileAvatar: {
    width: '1.5em',
    marginLeft: '5px',
  },
  loginButton:  {
    marginRight: '5px',
  }
};

const SignedIn = ({ classes, getUserPoints, userDisplayName }) => (
  <div className={classes.headerRight}>
    <div className={classes.profileDisplay}>
      <NavLink to='/profile' className={classes.profilePoints}>
        <Typography variant='body1'>{ getUserPoints }</Typography>
      </NavLink>
      <NavLink to='/stats' className={classes.profileName}>
        <Typography variant='caption'>{ userDisplayName }</Typography>
      </NavLink>
    </div>
    <div className={classes.profileAvatar}>
      <NavLink to='/profile'>
        <Avatar>
          <AvatarIcon />
        </Avatar>
      </NavLink>
    </div>
  </div>
);

SignedIn.propTypes = {
  getUserPoints   : PropTypes.string,
  userDisplayName : PropTypes.string,
  classes         : PropTypes.object.isRequired
};

const SignedOut = ({ classes }) => (
  <div className={classes.flex}>
    <Button label='Login' href='/login' primary />
    <Button label='Register' href='/register' secondary />
  </div>
);

SignedOut.propTypes = {
  classes         : PropTypes.object.isRequired
};

const HeaderRight = ({ isSignedIn, ...props }) => {
  if (isSignedIn) {
    return SignedIn(props);
  }
  return SignedOut(props);
};

HeaderRight.propTypes = {
  isSignedIn      : PropTypes.bool.isRequired,
};

const mapActionCreators = { };

const mapStateToProps = (state) => ({
  userDisplayName: userDisplaySelector(state),
  getUserPoints:   userPointsSelector(state),
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps, mapActionCreators)(withStyles(styles)(HeaderRight));
