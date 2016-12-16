import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SettingsContainer = require('./containers/SettingsContainer').default;
      const reducer = require('./modules/settings').default;

      injectReducer(store, { key: 'settings', reducer });

      cb(null, SettingsContainer);

    }, 'settings');
  }
});
