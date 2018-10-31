// cosmos.proxies.js
// import createFetchProxy from 'react-cosmos-fetch-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import createBackgroundProxy from 'react-cosmos-background-proxy';

// We can import app files here
import createStore from './store/createStore';
// Read more about configuring Redux in the Redux proxy section below
const ReduxProxy = createReduxProxy({
  createStore: state => createStore(state)
});

// We ensure a specific proxy order
export default [
  // Not all proxies have options, and often relying on defaults is good enough
  // createFetchProxy(),
  createBackgroundProxy(() => {
    /* eslint-disable global-require */
    require('./styles/cosmos.scss');
    /* eslint-enable global-require */
  }),
  ReduxProxy,
  createRouterProxy()
];
