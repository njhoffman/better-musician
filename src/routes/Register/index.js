import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { init as initLog } from 'shared/logger';


const { log, debug } = initLog('registerView');

export default (store, auth) => ({
  path : 'register',
  getComponent(nextState, cb) {
    log('top 1');

    require.ensure([], (require) => {
      log('Past require.ensure', console, window.location);
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }

      debug(console);
      log('Past auth', console, window.location);
      debug(window.location);
      const importModules = Promise.all([
        require('./components/RegisterView').default,
        require('./modules/register').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'registerView', reducer: reducer });
        initView(store, 'registerView');
        cb(null, container);
      });
      importModules.catch(error => {
        console.error('Error importing dynamic modules', error);
      });
    }, 'registerView');
  }
});
