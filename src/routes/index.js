import React, { Component }  from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoadRoute } from './loader';

import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
  userIsAuthenticated, userIsNotAuthenticated, userNoAuthentication } from '../auth';

// Need to apply the hocs here to avoid applying them inside the render method

const HomeRoute = userNoAuthentication(LoadRoute('Home'));
const LoginRoute = userIsNotAuthenticatedRedir(LoadRoute('Login'));
const RegisterRoute = userIsNotAuthenticatedRedir(LoadRoute('Register'));

const ResetRoute = userIsAuthenticatedRedir(LoadRoute('Reset'));

const SongsRoute = userIsAuthenticatedRedir(LoadRoute('Songs'));
const SettingsRoute = userIsAuthenticatedRedir(LoadRoute('Settings'));
const ProfileRoute = userIsAuthenticatedRedir(LoadRoute('Profile'));
const StatsRoute = userIsAuthenticatedRedir(LoadRoute('Stats'));
const FieldsRoute = userIsAuthenticatedRedir(LoadRoute('Fields'));
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
