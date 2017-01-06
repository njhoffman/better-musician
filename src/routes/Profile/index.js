import { injectReducer } from 'store/reducers';

export default (store) => ({
  path : 'profile',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ProfileViewContainer = require('./containers/ProfileViewContainer').default;
      const reducer = require('./modules/profile').default;

      injectReducer(store, { key: 'profileView', reducer });

      cb(null, ProfileViewContainer);

    }, 'profileView');
  }
});
