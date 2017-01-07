import { injectReducer } from '../../store/reducers';

export default (store, auth) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const HomeContainer = require('./containers/HomeViewContainer').default;
      cb(null, HomeContainer);

    }, 'homeView');
  }
});

