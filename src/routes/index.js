// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import HomeRoute from './Home';
import SongsRoute from './Songs';
import SettingsRoute from './Settings';
import ProfileRoute from './Profile';
import StatsRoute from './Stats';
import FieldsRoute from './Fields';
import ResetRoute from './Reset';
import LoginRoute from './Login';
import RegisterRoute from './Register';
import { browserHistory } from 'react-router';

export const createRoutes = (store) => {
  const auth = (level) => () => {
    const user = store.getState().auth ? store.getState().auth.get('user') : null;
    if (!user || !user.get('isSignedIn')) {
      browserHistory.push('login?redirect=' +
        encodeURIComponent(window.location.pathname.substr(1)));
      return false;
    }
    return true;
  };

  return ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : HomeRoute(store),
    childRoutes : [
      LoginRoute(store),
      RegisterRoute(store),
      ResetRoute(store),
      SongsRoute(store, auth('user')),
      StatsRoute(store, auth('user')),
      FieldsRoute(store, auth('user')),
      SettingsRoute(store, auth('user')),
      ProfileRoute(store, auth('user'))
    ]
  });
};

export default createRoutes;
