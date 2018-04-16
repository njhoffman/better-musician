import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./components/index'),
  loading: LoadingIndicator
});

// import { injectReducer } from 'store/reducers';
// import { initView } from 'store/view';
// import { init as initLog } from 'shared/logger';
// import { Promise as ES6Promise } from 'es6-promise';
//
// const { log, error } = initLog('registerView');
//
// // Polyfill webpack require.ensure for testing
// if (__TEST__) { require('require-ensure-shim').shim(require); }
//
// export default (store, auth) => ({
//   path : 'register',
//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       if (auth && (auth() === false)) {
//         log('authentication failed');
//         return;
//       }
//       const importModules = ES6Promise.all([
//         require('./components/RegisterView').default,
//         require('./modules/register').default
//       ]);
//
//       importModules.then(([container, reducer]) => {
//         log('modules imported, initializing view');
//         injectReducer(store, { key: 'registerView', reducer: reducer });
//         initView(store, 'registerView');
//         cb(null, container);
//       }).catch(err => {
//         error('Error importing dynamic modules', err);
//       });
//     }, 'registerView');
//   }
// });
