import { initView } from 'store/view';

export default (store, auth) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/HomeView').default
      ]);
      importModules.then(([container]) => {
        initView(store, 'homeView');
        cb(null, container);
      });
    }, 'homeView');
  }
});
