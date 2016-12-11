import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'songs',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SongsContainer = require('./containers/SongsViewContainer').default;
      const reducer = require('./modules/songs').default;

      injectReducer(store, { key: 'songs', reducer });

      cb(null, SongsContainer);

    }, 'songs');
  }
});
