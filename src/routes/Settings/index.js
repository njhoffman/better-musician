import { injectReducer } from '../../store/reducers';

export default (store, auth) => ({
  path : 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const SettingsViewContainer = require('./containers/SettingsViewContainer').default;
      const reducer = require('./modules/settings').default;

      injectReducer(store, { key: 'settingsView', reducer });

      cb(null, SettingsViewContainer);

    }, 'settingsView');
  }
});
