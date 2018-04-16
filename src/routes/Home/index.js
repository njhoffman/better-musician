import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./components/index'),
  loading: LoadingIndicator
});

// export default class HomeView extends React.Component {
//   render() {
//     return (
//       <h2>Hello dudes!</h2>
//     );
//   }
// }
//
// import { Promise as ES6Promise } from 'es6-promise';
// import { init as initLog } from 'shared/logger';
// import { initView } from 'store/view';
//
// const { log, error } = initLog('homeView');
//
// // Polyfill webpack require.ensure for testing
// if (__TEST__) { require('require-ensure-shim').shim(require); }
//
// export default (store, auth) => ({
//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       if (auth && (auth() === false)) {
//         log('authentication failed');
//         return;
//       }
//       const importModules = ES6Promise.all([
//         require('./components/HomeView').default
//       ]);
//       importModules.then(([container]) => {
//         log('modules imported, initializing view');
//         initView(store, 'homeView');
//         cb(null, container);
//       });
//       importModules.catch(err => {
//         error('Error importing dynamic modules', err);
//       });
//     }, 'homeView');
//   }
// });
