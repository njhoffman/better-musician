import { injectReducer, initView } from 'store/reducers';
import { fetchSongs } from './modules/songs';


export default (store, auth) => ({
  path : 'songs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {

      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }

      const importModules = Promise.all([
        require('./components/SongsViewContainer').default,
        require('./modules/songs').default,
        require('./modules/model').default
      ]);

      importModules.then( ([container, reducer, models]) => {
        injectReducer(store, { key: 'songsView', reducer: reducer, models: models });
        initView(store, 'songsView');
        store.dispatch(fetchSongs());
        cb(null, container);
      });

      importModules.catch(error => {
        console.error("Error importing dynamic modules", error);
      });

    }, 'songsView');
  }
});
