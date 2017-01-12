import { injectReducer, initView } from 'store/reducers';

export default (store, auth) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/LoginViewContainer').default,
        require('./modules/login').default
      ]);

      importModules.then( ([container, reducer]) => {
        injectReducer(store, { key: 'loginView', reducer: reducer });
        initView(store, 'loginView');
        cb(null, container);
      });

      importModules.catch(error => {
        console.error("Error importing dynamic modules", error);
      });


    }, 'loginView');
  }
});
