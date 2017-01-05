import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'settings',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SettingsViewContainer = require('./containers/SettingsViewContainer').default;
      const reducer = require('./modules/settings').default;

      injectReducer(store, { key: 'settingsView', reducer });

      cb(null, SettingsViewContainer);

    }, 'settingsView');
  }
});
