import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeRoute from './Home';
import LoginRoute from './Login';
import RegisterRoute from './Register';
import ResetRoute from './Reset';

import SongsRoute from './Songs';
import SettingsRoute from './Settings';
import ProfileRoute from './Profile';
import StatsRoute from './Stats';
import FieldsRoute from './Fields';


import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../auth'

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginRoute);
const ProtectedSongs = userIsAuthenticatedRedir(SongsRoute);
const ProtectedSettings = userIsAuthenticatedRedir(SettingsRoute);
const ProtectedProfile = userIsAuthenticatedRedir(ProfileRoute);
const ProtectedStats = userIsAuthenticatedRedir(StatsRoute);
const ProtectedFields = userIsAuthenticatedRedir(FieldsRoute);
// const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeRoute} />
        <Route path='/reset' component={ResetRoute} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={RegisterRoute} />
        <Route path='/fields' component={ProtectedFields} />
        <Route path='/songs' component={ProtectedSongs} />
        <Route path='/stats' component={ProtectedStats} />
        <Route path='/profile' component={ProtectedProfile} />
        <Route path='/settings' component={ProtectedSettings} />
      </Switch>
    )
  }
}

const logout = () => {
  return {
    type: 'USER_LOGGED_OUT'
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logout })(Routes);
