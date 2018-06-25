import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { MdAccountCircle as AvatarIcon } from 'react-icons/lib/md';
import { Avatar } from 'material-ui';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import css from './Header.scss';

const linkStyle = { display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' };

class HeaderRight extends Component {
  static propTypes = {
    theme           : PropTypes.object.isRequired,
    getUserPoints   : PropTypes.string,
    userDisplayName : PropTypes.string,
    isSignedIn      : PropTypes.bool.isRequired
  }

  renderSignedIn() {
    return (
      <div className={css.headerLink}>
        <div className={css.profileDisplay}>
          <Link
            to='/profile'>
            <div className={css.profilePoints}>
              { this.props.getUserPoints }
            </div>
            <div className={css.profileName}>
              { this.props.userDisplayName }
            </div>
          </Link>
        </div>
        <div className={css.profileAvatar}>
          <Link
            to='/profile'>
            <Avatar
              icon={<AvatarIcon />}
              style={{ backgroundColor: this.props.theme.palette.primary1Color }}
              size={35} />
          </Link>
        </div>
      </div>
    );
  }

  renderSignedOut() {
    // const buttonStyle = { height: '25px', display: 'table-cell', minWidth: '0px' };
    // const buttonLabelStyle = { padding: '5px 10px', paddingLeft: '10px', display: 'table-cell' };
    return (
      <div style={{ float: 'right', height: '100%', fontSize: '0.9em', paddingRight: '10px' }}>
        <div style={{ display: 'table', height: '100%' }}>
          <Link
            to='/login'
            style={linkStyle}>
            <Button
              label='Login'
              primary
              className={css.loginButton} />
          </Link>
          <Link
            to='/register'
            style={linkStyle}>
            <Button
              label='Register'
              secondary
              className={css.registerButton} />
          </Link>
        </div>
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
export default HeaderRight;
