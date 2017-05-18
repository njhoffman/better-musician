import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { fetchSongs } from 'store/api';

export default (store, auth) => ({
  path: 'profile',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/ProfileView').default,
        require('./modules/profile').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'profileView', reducer: reducer });
        initView(store, 'profileView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(error => {
        console.error('Error importing dynamic modules', error);
      });
    }, 'profileView');
  }
});
