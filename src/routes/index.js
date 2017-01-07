// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import HomeRoute from './Home';
import SongsRoute from './Songs';
import SettingsRoute from './Settings';
import ProfileRoute from './Profile';
import ResetRoute from './Reset';
import LoginRoute from './Login';
import RegisterRoute from './Register';
import {browserHistory} from 'react-router';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */


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
      SettingsRoute(store, auth('user')),
      ProfileRoute(store, auth('user'))
    ]
  });
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
