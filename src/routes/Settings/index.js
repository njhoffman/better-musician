import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { fetchSongs } from 'store/api';

export default (store, auth) => ({
  path : 'settings',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/SettingsViewContainer').default,
        require('./modules/settings').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'settingsView', reducer: reducer });
        initView(store, 'settingsView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(error => {
        console.error('Error importing dynamic modules', error);
      });
    }, 'settingsView');
  }
});
