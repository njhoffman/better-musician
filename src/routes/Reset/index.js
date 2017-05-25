import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { init as initLog } from 'shared/logger';

const { log, error } = initLog('resetView');

export default (store, auth) => ({
  path : 'reset',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/ResetView').default,
        require('./modules/reset').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'resetView', reducer: reducer });
        initView(store, 'resetView');
        cb(null, container);
      });
      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'resetView');
  }
});
