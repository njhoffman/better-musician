import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginViewContainer = require('./containers/LoginViewContainer').default;
      const reducer = require('./modules/login').default;

      injectReducer(store, { key: 'loginView', reducer });

      cb(null, LoginViewContainer);

    }, 'loginView');
  }
});
