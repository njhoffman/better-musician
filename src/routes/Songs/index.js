import { injectReducer } from 'store/reducers';

export default (store) => ({
  path : 'songs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {

      const songsViewReducer = require('./modules/songs').default;
      const songsModels = require('./modules/model').models;

      injectReducer(store, { key: 'songsView', reducer: songsViewReducer, models: songsModels });
      const SongsContainer = require('./containers/SongsViewContainer').default;

      store.dispatch({ type: "INIT_SONG_VIEW" });

      cb(null, SongsContainer);

    }, 'songsView');
  }
});
