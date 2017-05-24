import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { init as initLog } from 'shared/logger';
import { Promise as ES6Promise } from 'es6-promise';

const { log, error } = initLog('registerView');

export default (store, auth) => ({
  path : 'register',
  getComponent(nextState, cb) {

    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/RegisterView').default,
        require('./modules/register').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'registerView', reducer: reducer });
        initView(store, 'registerView');
        cb(null, container);
      });
      importModules.catch(error => {
        error('Error importing dynamic modules', error);
      });
    }, 'registerView');
  }
});
