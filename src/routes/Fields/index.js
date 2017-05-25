import { Promise as ES6Promise } from 'es6-promise';
import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { fetchSongs } from 'store/api';
import { init as initLog } from 'shared/logger';

const { log, error } = initLog('fieldsView');

export default (store, auth) => ({
  path : 'fields',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        log('authentication failed');
        return;
      }
      const importModules = ES6Promise.all([
        require('./components/FieldsView').default,
        require('./modules/fields').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'fieldsView', reducer: reducer });
        initView(store, 'fieldsView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(err => {
        error('Error importing dynamic modules', err);
      });
    }, 'fieldsView');
  }
});
