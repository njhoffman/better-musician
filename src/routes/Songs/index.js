import { injectReducer } from 'store/reducers';
import { fetchSongs } from './modules/songs';

export default (store) => ({
  path : 'songs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {

      const songsViewReducer = require('./modules/songs').default;
      const songsModels = require('./modules/model').models;

      injectReducer(store, { key: 'songsView', reducer: songsViewReducer, models: songsModels });
      const SongsContainer = require('./containers/SongsViewContainer').default;

      store.dispatch({ type: "INIT_SONG_VIEW" });
      fetchSongs(store.dispatch);

      cb(null, SongsContainer);

    }, 'songsView');
  }
});
