import { injectReducer } from '../../store/reducers';

export default (store, auth) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const LoginViewContainer = require('./containers/LoginViewContainer').default;
      const reducer = require('./modules/login').default;

      injectReducer(store, { key: 'loginView', reducer });

      cb(null, LoginViewContainer);

    }, 'loginView');
  }
});
