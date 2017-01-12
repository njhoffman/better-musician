import React, { Component }  from 'react';
import { MdAccountCircle as AvatarIcon } from 'react-icons/lib/md';
import { Avatar } from 'material-ui';
import { Link } from 'react-router';
import css from './Header.scss';

class HeaderRight extends Component {
  render() {
    if (this.props.user && this.props.user.get("isSignedIn")) {
      return (
        <div className={css.headerLink}>
          <div className={css.profileDisplay}>
            <Link to='/profile' style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
              <div className={css.profilePoints}>{ this.props.user.get("attributes").get("points") }</div>
              <div className={css.profileName}>{ this.props.user.get("attributes").get("email") }</div>
            </Link>
          </div>
          <div className={css.profileAvatar}>
            <Link to='/profile' style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
              <Avatar
                icon={<AvatarIcon />}
                backgroundColor={this.props.muiTheme.palette.primary1Color}
                size={35}
              />
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div style={{ float: 'right', height: '100%', fontSize: '0.9em', paddingRight: '10px' }}>
        <div style={{ display: 'table', height: '100%' }}>
          <Link to='/login' style={{ display: 'table-cell', verticalAlign: 'middle', paddingRight: '5px' }}>
            <RaisedButton
              style={{ height: '25px', display: 'table-cell', minWidth: '0px' }}
              labelStyle={{ padding: '5px 10px', paddingLeft: '10px', display: 'table-cell' }}
              className={css.loginButton}
              label="LOGIN"
              primary={true} />
          </Link>
          <Link to='/register' style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <RaisedButton
              style={{ height: '25px', display: 'table-cell', minWidth: '0px' }}
              labelStyle={{ padding:'5px 10px', paddingLeft: '10px', display: 'table-cell' }}
              className={css.registerButton}
              label="REGISTER" />
          </Link>
        </div>
      </div>
    );
  }
}
export default HeaderRight;
