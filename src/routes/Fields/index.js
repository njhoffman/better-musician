import { injectReducer } from 'store/reducers';
import { initView } from 'store/view';
import { fetchSongs } from 'store/api';

export default (store, auth) => ({
  path : 'fields',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      if (auth && (auth() === false)) {
        console.info('authentication failed');
        return;
      }
      const importModules = Promise.all([
        require('./components/FieldsView').default,
        require('./modules/fields').default
      ]);
      importModules.then(([container, reducer]) => {
        injectReducer(store, { key: 'fieldsView', reducer: reducer });
        initView(store, 'fieldsView');
        fetchSongs(store);
        cb(null, container);
      });
      importModules.catch(error => {
        console.error('Error importing dynamic modules', error);
      });
    }, 'fieldsView');
  }
});
