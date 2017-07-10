import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { init as initLog } from 'shared/logger';
import { initView } from 'store/view';

const { log, error } = initLog('settingsView');

// Polyfill webpack require.ensure for testing
if (__TEST__) { require('require-ensure-shim').shim(require); }

export default (store, auth) => ({
  path : 'settings',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/SettingsView').default,
        require('./modules/settings').default
      ]);

      importModules.then(([container, reducer]) => {
        log('modules imported, initializing view');
        injectReducer(store, { key: 'settingsView', reducer: reducer });
        initView(store, 'settingsView');
        cb(null, container);
      }).catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'settingsView');
  }
});
