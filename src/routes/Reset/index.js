import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';

export default (store, auth) => ({
  path : 'reset',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/ResetView').default,
        require('./modules/reset').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'resetView', reducer: reducer });
        initView(store, 'resetView');
        cb(null, container);
      });
      importModules.catch(error => {
        console.error('Error importing dynamic modules', error);
      });
    }, 'resetView');
  }
});
