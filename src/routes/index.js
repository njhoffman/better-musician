import React, { Component }  from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoadRoute } from './loader';

import { userIsAuthRedir, userNotAuthRedir, userIsAdminRedir,
  userIsAuth, userNotAuth, userNoAuthentication } from './auth';

// Need to apply the hocs here to avoid applying them inside the render method

const HomeRoute = userNoAuthentication(LoadRoute('Home'));
const LoginRoute = userNotAuthRedir(LoadRoute('Login'));
const RegisterRoute = userNotAuthRedir(LoadRoute('Register'));

const ResetRoute = userIsAuthRedir(LoadRoute('Reset'));

const SongsRoute = userIsAuthRedir(LoadRoute('Songs'));
const SettingsRoute = userIsAuthRedir(LoadRoute('Settings'));
const ProfileRoute = userIsAuthRedir(LoadRoute('Profile'));
const StatsRoute = userIsAuthRedir(LoadRoute('Stats'));
const FieldsRoute = userIsAuthRedir(LoadRoute('Fields'));
// const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeRoute} store={this.props.store} />
        <Route path='/reset' component={ResetRoute} store={this.props.store} />
        <Route path='/login' component={LoginRoute} store={this.props.store} />
        <Route path='/register' component={RegisterRoute} store={this.props.store} />
        <Route path='/fields' component={FieldsRoute} store={this.props.store} />
        <Route path='/songs' component={SongsRoute} store={this.props.store} />
        <Route path='/stats' component={StatsRoute} store={this.props.store} />
        <Route path='/profile' component={ProfileRoute} store={this.props.store} />
        <Route path='/settings' component={SettingsRoute} store={this.props.store} />
      </Switch>
    );
  }
}

const logout = () => {
  return {
    type: 'USER_LOGGED_OUT'
  };
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionCreators = ({
  logout
});

export default withRouter(connect(mapStateToProps, mapActionCreators)(Routes));
