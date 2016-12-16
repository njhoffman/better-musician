import { injectReducer } from '../../store/reducers';

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeContainer = require('./containers/HomeViewContainer').default;
      // const reducer = require('./modules/songs').default;
      //
      // injectReducer(store, { key: 'home', reducer });

      cb(null, HomeContainer);

    }, 'home');
  }
});

// Sync route definition
// export default {
//   component : HomeContainer
// };
