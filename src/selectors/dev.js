import { createSelector } from 'reselect';

// for hand selecting state objects to persist, pretty unstable
export const persistSelector = createStore => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer);
  const { getState } = store;
  store.getState = () => {
    const liftedState = getState();
    return liftedState;
  };
  return store;
};

const currentViewSelector = state => {
  const view = state[`${state.ui.currentView}View`] || {};
  return view;
};

export const commonActionSetsSelector = state => createSelector(
  currentViewSelector,
  ({ commonActionSets }) => commonActionSets
);

export const viewActionSetsSelector = createSelector(
  currentViewSelector,
  ({ viewActionSets }) => viewActionSets
);
