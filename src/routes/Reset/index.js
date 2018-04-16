import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./components/index'),
  loading: LoadingIndicator
});

// import { Promise as ES6Promise } from 'es6-promise';
// import { injectReducer } from 'store/reducers';
// import { initView } from 'store/view';
// import { init as initLog } from 'shared/logger';
//
// const { log, error } = initLog('resetView');
//
// // Polyfill webpack require.ensure for testing
// if (__TEST__) { require('require-ensure-shim').shim(require); }
//
// export default (store, auth) => ({
//   path : 'reset',
//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       if (auth && (auth() === false)) {
//         log('authentication failed');
//         return;
//       }
//       const importModules = ES6Promise.all([
//         require('./components/ResetView').default,
//         require('./modules/reset').default
//       ]);
//       importModules.then(([container, reducer]) => {
//         log('modules imported, initializing view');
//         injectReducer(store, { key: 'resetView', reducer: reducer });
//         initView(store, 'resetView');
//         cb(null, container);
//       });
//       importModules.catch(err => {
//         error('Error importing dynamic modules', err);
//       });
//     }, 'resetView');
//   }
// });
