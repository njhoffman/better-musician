import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { init as initLog } from 'shared/logger';
import { fetchSongs } from 'store/api';

const { log, error } = initLog('statsView');

export default (store, auth) => ({
  path : 'stats',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }

      const importModules = ES6Promise.all([
        require('./components/StatsView').default,
        require('./modules/stats').default
      ]);

      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'statsView', reducer: reducer });
        initView(store, 'statsView');
        fetchSongs(store);
        cb(null, container);
      });

      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'statsView');
  }
});
