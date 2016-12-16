import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginContainer = require('./containers/LoginContainer').default;
      const reducer = require('./modules/login').default;

      injectReducer(store, { key: 'login', reducer });

      cb(null, LoginContainer);

    }, 'login');
  }
});
