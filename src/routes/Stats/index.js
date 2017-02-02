import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { fetchSongs } from 'store/api';

export default (store, auth) => ({
  path : 'stats',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }

      const importModules = Promise.all([
        require('./components/StatsViewContainer').default,
        require('./modules/stats').default
      ]);

      importModules.then( ([container, reducer]) => {
        injectReducer(store, { key: 'statsView', reducer: reducer });
        initView(store, 'statsView');
        fetchSongs(store);
        cb(null, container);
      });

      importModules.catch(error => {
        console.error("Error importing dynamic modules", error);
      });

    }, 'statsView');
  }
});
