import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { init as initLog } from 'shared/logger';
import { fetchSongs } from 'store/api';

const { log, error } = initLog('registerView');

export default (store, auth) => ({
  path: 'profile',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/ProfileView').default,
        require('./modules/profile').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'profileView', reducer: reducer });
        initView(store, 'profileView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'profileView');
  }
});
