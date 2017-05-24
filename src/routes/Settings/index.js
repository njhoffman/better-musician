import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { init as initLog } from 'shared/logger';
import { initView } from 'store/view';
import { fetchSongs } from 'store/api';

const { info, error } = initLog('settingsView');

export default (store, auth) => ({
  path : 'settings',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        info('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/SettingsView').default,
        require('./modules/settings').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'settingsView', reducer: reducer });
        initView(store, 'settingsView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'settingsView');
  }
});
