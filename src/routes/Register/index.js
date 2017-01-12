import { injectReducer, initView } from 'store/reducers';

export default (store, auth) => ({
  path : 'register',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/RegisterViewContainer').default,
        require('./modules/register').default
      ]);

      importModules.then( ([container, reducer]) => {
        injectReducer(store, { key: 'registerView', reducer: reducer });
        initView(store, 'registerView');
        cb(null, container);
      });

      importModules.catch(error => {
        console.error("Error importing dynamic modules", error);
      });

    }, 'registerView');
  }
});
