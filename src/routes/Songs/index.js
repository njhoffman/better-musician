import { injectReducer } from 'store/reducers';
import { fetchSongs } from './modules/songs';

export default (store, auth) => ({
  path : 'songs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {

      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }

      // const renderRoute = loadModule(cb, UserIsAuthenticated);
      const importModules = Promise.all([
        require('./containers/SongsViewContainer').default,
        require('./modules/songs').default,
        require('./modules/model').default
      ]);

      importModules.then( ([container, reducer, models]) => {
        injectReducer(store, { key: 'songsView', reducer: reducer, models: models });
        store.dispatch({ type: "INIT_SONG_VIEW" });
        store.dispatch(fetchSongs());
        cb(null, container);
      });

      importModules.catch(error => {
        debugger;
      });

    }, 'songsView');
  }
});
