import { injectReducer } from 'store/reducers';

export default (store, auth) => ({
  path : 'profile',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const ProfileViewContainer = require('./containers/ProfileViewContainer').default;
      const reducer = require('./modules/profile').default;

      injectReducer(store, { key: 'profileView', reducer });

      cb(null, ProfileViewContainer);

    }, 'profileView');
  }
});
