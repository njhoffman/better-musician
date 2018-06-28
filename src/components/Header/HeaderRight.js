import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { MdAccountCircle as AvatarIcon } from 'react-icons/lib/md';
import { withStyles, Avatar } from '@material-ui/core';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import css from './Header.scss';
import { Row, Column } from 'react-foundation';

const styles = {
  flex: {
    flex: 1,
    textAlign: 'right'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center'
  },
};

class HeaderRight extends Component {
  static propTypes = {
    getUserPoints   : PropTypes.string,
    userDisplayName : PropTypes.string,
    isSignedIn      : PropTypes.bool.isRequired
  }

  renderSignedIn() {
    return (
      <div className={this.props.classes.headerRight}>
        <div className={css.profileDisplay}>
          <Link to='/profile'>
            <div className={css.profilePoints}>
              { this.props.getUserPoints }
            </div>
            <div className={css.profileName}>
              { this.props.userDisplayName }
            </div>
          </Link>
        </div>
        <div className={css.profileAvatar}>
          <Link to='/profile'>
            <Avatar
              icon={<AvatarIcon />}
              size={35} />
          </Link>
        </div>
      </div>
    );
  }

  renderSignedOut() {
    return (
      <div className={this.props.classes.flex}>
        <Button label='Login' href='/login' primary />
        <Button label='Register' href='/register' secondary />
      </div>
    );
  }

  render() {
    if (this.props.isSignedIn) {
      return this.renderSignedIn();
    }
    return this.renderSignedOut();
  }
}
export default withStyles(styles)(HeaderRight);
