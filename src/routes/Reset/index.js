import { injectReducer } from 'store/reducers';

export default (store, auth) => ({
  path : 'reset',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const ResetContainer = require('./containers/ResetViewContainer').default;
      const reducer = require('./modules/reset').default;

      injectReducer(store, { key: 'resetView', reducer });

      cb(null, ResetContainer);

    }, 'resetView');
  }
});

