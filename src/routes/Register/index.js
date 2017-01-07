import { injectReducer } from '../../store/reducers';

export default (store, auth) => ({
  path : 'register',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const RegisterViewContainer = require('./containers/RegisterViewContainer').default;
      const reducer = require('./modules/register').default;

      injectReducer(store, { key: 'registerView', reducer });

      cb(null, RegisterViewContainer);

    }, 'registerView');
  }
});
