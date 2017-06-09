import { Promise as ES6Promise } from 'es6-promise';
import { init as initLog } from 'shared/logger';
import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';

const { log, error } = initLog('loginView');

// Polyfill webpack require.ensure for testing
if (__TEST__) { require('require-ensure-shim').shim(require); }

export default (store, auth) => ({
  path : 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/LoginView').default,
        require('./modules/login').default
      ]);

      importModules.then(([container, reducer]) => {
        log('modules imported, initializing view');
        injectReducer(store, { key: 'loginView', reducer: reducer });
        initView(store, 'loginView');
        cb(null, container);
      }).catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'loginView');
  }
});
