import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import connectRoute from 'components/hoc/loader';

import {
  userIsAuthOrRedir,
  userNotAuthOrRedir,
  // userIsAdminRedir,
  // userIsAuth,
  // userNotAuth,
  noAuth
} from 'components/hoc/router';

// const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

class Routes extends Component {
  constructor(props) {
    super(props);
    this.HomeRoute = noAuth(connectRoute('Home', props));
    this.LoginRoute = noAuth(connectRoute('Login', props));
    this.RegisterRoute = userNotAuthOrRedir(connectRoute('Register', props));
    this.SongsRoute = userIsAuthOrRedir(connectRoute('Songs', props));
    this.ProfileRoute = userIsAuthOrRedir(connectRoute('Profile', props));
    this.SettingsRoute = userIsAuthOrRedir(connectRoute('Settings', props));
    this.FieldsRoute = userIsAuthOrRedir(connectRoute('Fields', props));
    this.ResetRoute = noAuth(connectRoute('Reset', props));
    this.MissedRoute = noAuth(connectRoute('Missed', props));
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={this.HomeRoute} />
        <Route path='/reset*' component={this.ResetRoute} />
        <Route path='/login*' component={this.LoginRoute} />
        <Route path='/register*' component={this.RegisterRoute} />
        <Route path='/fields*' component={this.FieldsRoute} />
        <Route path='/songs*' component={this.SongsRoute} />
        <Route path='/stats*' component={this.StatsRoute} />
        <Route path='/profile*' component={this.ProfileRoute} />
        <Route path='/settings*' component={this.SettingsRoute} />
        <Route component={this.MissedRoute} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionCreators = ({
});


export default withRouter(connect(mapStateToProps, mapActionCreators)(Routes));
