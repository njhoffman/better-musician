import React, { Component, PropTypes }  from 'react';
import { MdAccountCircle as AvatarIcon } from 'react-icons/lib/md';
import { Avatar, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import css from './Header.scss';

const linkStyle = { display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' };

class HeaderRight extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired,
    user: PropTypes.object,
    getUserPoints: PropTypes.string,
    userDisplayName: PropTypes.string
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
              backgroundColor={this.props.muiTheme.palette.primary1Color}
              size={35} />
          </Link>
        </div>
      </div>
    );
  }

  renderSignedOut() {
    const buttonStyle = { height: '25px', display: 'table-cell', minWidth: '0px' };
    const buttonLabelStyle = { padding: '5px 10px', paddingLeft: '10px', display: 'table-cell' };
    return (
      <div style={{ float: 'right', height: '100%', fontSize: '0.9em', paddingRight: '10px' }}>
        <div style={{ display: 'table', height: '100%' }}>
          <Link to='/login'
            style={linkStyle}>
            <RaisedButton
              style={buttonStyle}
              labelStyle={buttonLabelStyle}
              className={css.loginButton}
              primary
              label='LOGIN' />
          </Link>
          <Link
            to='/register'
            style={linkStyle}>
            <RaisedButton
              style={buttonStyle}
              secondary
              labelStyle={buttonLabelStyle}
              className={css.registerButton}
              label='REGISTER' />
          </Link>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.user && this.props.user.get('isSignedIn')) {
      return this.renderSignedIn();
    }
    return this.renderSignedOut();
  }
}
export default HeaderRight;
