import { injectReducer } from 'store/reducers';

export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ResetContainer = require('./containers/ResetViewContainer').default;
      const reducer = require('./modules/reset').default;

      injectReducer(store, { key: 'resetView', reducer });

      cb(null, HomeContainer);

    }, 'resetView');
  }
});

