import HomeRoute from './Home';
import SongsRoute from './Songs';
import SettingsRoute from './Settings';
import ProfileRoute from './Profile';
import StatsRoute from './Stats';
import FieldsRoute from './Fields';
import ResetRoute from './Reset';
import LoginRoute from './Login';
import RegisterRoute from './Register';

import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeRoute} />
        <Route path='/reset' component={ResetRoute} />
        <Route path='/login' component={LoginRoute} />
        <Route path='/register' component={RegisterRoute} />
        <Route path='/fields' component={FieldsRoute} />
        <Route path='/songs' component={SongsRoute} />
        <Route path='/stats' component={StatsRoute} />
        <Route path='/profile' component={ProfileRoute} />
        <Route path='/settings' component={SettingsRoute} />
      </Switch>
    )
  }
}

export default Routes;
