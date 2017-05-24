import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { init as initLog } from 'shared/logger';
import { fetchSongs } from 'store/api';

const { log, error } = initLog('songsView');

export default (store, auth) => ({
  path : 'songs',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/SongsView').default,
        require('./modules/songs').default
      ]);
      importModules.then(([container, reducer, models]) => {
        injectReducer(store, { key: 'songsView', reducer: reducer, models: models });
        initView(store, 'songsView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'songsView');
  }
});
