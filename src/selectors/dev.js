import { createSelector } from 'reselect';
import _ from 'lodash';

// for hand selecting state objects to persist in extension, pretty unstable
export const extensionPersistSelector = createStore => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer);
  const { getState } = store;
  store.getState = () => {
    const liftedState = getState();
    return liftedState;
  };
  return store;
};

// HUD devtools persist state

const buildKeys = (obj, map) => {
  _.keys(obj).forEach(key => {
    /* eslint-disable no-param-reassign */
    if (_.isObject(obj[key]) && !_.isArray(obj[key]) && _.keys(obj[key]).length > 0) {
      const sublinks = {};
      buildKeys(obj[key], sublinks);
      map[key] = { name: key, sublinks };
    } else {
      map[key] = { name: key };
    }
    /* eslint-enable no-param-reassign */
  });
  return map;
};

export const hudPersistStateSelector = state => {
  const results = {};
  buildKeys(_.omit(state, ['orm', 'config', 'api', 'router', 'user']), results);
  // buildKeys(_.omit(state, []), results);
  return results;
};

export const currentViewSelector = state => (
  state[`${state.ui.currentView}View`] || {}
);

export const commonActionSetsSelector = createSelector(
  currentViewSelector,
  ({ commonActionSets }) => commonActionSets
);

export const viewActionSetsSelector = createSelector(
  currentViewSelector,
  ({ viewActionSets }) => viewActionSets
);
