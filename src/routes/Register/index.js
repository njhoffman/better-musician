import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path : 'register',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RegisterViewContainer = require('./containers/RegisterViewContainer').default;
      const reducer = require('./modules/register').default;

      injectReducer(store, { key: 'registerView', reducer });

      cb(null, RegisterViewContainer);

    }, 'registerView');
  }
});
