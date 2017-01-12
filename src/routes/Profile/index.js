import { injectReducer, initView } from 'store/reducers';

export default (store, auth) => ({
  path : 'profile',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }

      const importModules = Promise.all([
        require('./components/ProfileViewContainer').default,
        require('./modules/profile').default
      ]);

      importModules.then( ([container, reducer]) => {
        injectReducer(store, { key: 'profileView', reducer: reducer });
        initView(store, 'profileView');
        cb(null, container);
      });

      importModules.catch(error => {
        console.error("Error importing dynamic modules", error);
      });

    }, 'profileView');
  }
});
