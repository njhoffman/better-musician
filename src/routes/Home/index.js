import { Promise as ES6Promise } from 'es6-promise';
import { init as initLog } from 'shared/logger';
import { initView } from 'store/view';

const { log, error } = initLog('homeView');

export default (store, auth) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/HomeView').default
      ]);
      importModules.then(([container]) => {
        initView(store, 'homeView');
        cb(null, container);
      });
      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'homeView');
  }
});
