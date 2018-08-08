import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import { initView } from 'actions/ui';

import { init as initLog } from 'shared/logger';
const { info } = initLog('router');

import {
  userIsAuthRedir,
  userNotAuthRedir,
  // userIsAdminRedir,
  // userIsAuth,
  // userNotAuth,
  userNoAuthentication
} from './auth';

// Need to apply the hocs here to avoid applying them inside the render method

const LoadComponent = ({ store, history }, route, importRoute) => {
  return Loadable({
    loader: () => {
      info(`Loading component  ${route}View`);
      initView(store, history, route);
      return importRoute
        .then((View) => {
          info(`Returning view ${route}`);
          return View;
        });
    },
    loading: LoadingIndicator
  });
};

// const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

class Routes extends Component {
  constructor(props) {
    super(props);
    this.HomeRoute = userNoAuthentication(LoadComponent(props, 'Home',
      import(/* webpackChunkName: "HomeView" */ `routes/Home/components/HomeView`))
    );
    this.LoginRoute = userNoAuthentication(LoadComponent(props, 'Login',
      import(/* webpackChunkName: "LoginView" */ `routes/Login/components/LoginView`))
    );
    this.RegisterRoute = userNotAuthRedir(LoadComponent(props, 'Register',
      import(/* webpackChunkName: "RegisterView" */ `routes/Register/components/RegisterView`))
    );
    this.SongsRoute = userIsAuthRedir(LoadComponent(props, 'Songs',
      import(/* webpackChunkName: "SongsView" */ `routes/Songs/components/SongsView`))
    );
    this.ProfileRoute = userIsAuthRedir(LoadComponent(props, 'Profile',
      import(/* webpackChunkName: "ProfileView" */ `routes/Profile/components/ProfileView`))
    );
    this.SettingsRoute = userIsAuthRedir(LoadComponent(props, 'Settings',
      import(/* webpackChunkName: "SettingsView" */ `routes/Settings/components/SettingsView`))
    );
    this.FieldsRoute = userIsAuthRedir(LoadComponent(props, 'Fields',
      import(/* webpackChunkName: "FieldsView" */ `routes/Fields/components/FieldsView`))
    );
    this.StatsRoute = userIsAuthRedir(LoadComponent(props, 'Stats',
      import(/* webpackChunkName: "StatsView" */ `routes/Stats/components/StatsView`))
    );
    this.ResetRoute = userNoAuthentication(LoadComponent(props, 'Reset',
      import(/* webpackChunkName: "ResetView" */ `routes/Reset/components/ResetView`))
    );
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={this.HomeRoute} />
        <Route path='/reset' component={this.ResetRoute} />
        <Route path='/login' component={this.LoginRoute} />
        <Route path='/register' component={this.RegisterRoute} />
        <Route path='/fields' component={this.FieldsRoute} />
        <Route path='/songs' component={this.SongsRoute} />
        <Route path='/stats' component={this.StatsRoute} />
        <Route path='/profile' component={this.ProfileRoute} />
        <Route path='/settings' component={this.SettingsRoute} />
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
  logout,
  initView
});


export default withRouter(connect(mapStateToProps, mapActionCreators)(Routes));
